import os
import sys
import io
import base64
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import cv2
from tensorflow.keras.models import load_model

# Import YOLO. his might require 'pip install ultralytics' If Yolo is missing it installs automatically
try:
    from ultralytics import YOLO
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "ultralytics"])
    from ultralytics import YOLO

#Initializing the application and loading models
app = Flask(__name__)
CORS(app)

model = load_model("model.h5") #Loads the saved classification model
yolo_model = YOLO("yolov8n.pt")  # Load pre-trained YOLOv8 model

#Mapping class indices to aircraft names as neural networks doesnot understand names so that it can return the probility output mapping to the index with higherst confidence
class_labels = {
    0: 'B-1', 1: 'B-2', 2: 'B-52', 3: 'Boeing',
    4: 'C-130', 5: 'C-135', 6: 'C-17', 7: 'C-5',
    8: 'E-3', 9: 'F-22', 10: 'KC-10',
    11: 'type-12(C-21)', 12: 'type-13(U-2)',
    13: 'type-15(A-10)', 14: 'type-16(A-26)',
    15: 'type-17(P-63)', 16: 'type-18(F-16)',
    17: 'type-19(T-6)', 18: 'type-20(B-29)',
    19: 'type-21(t-43)'
}

#Simple Test Route to verify backend running status
@app.route('/')
def home():
    return "Backend is running"

#Prediction Route 
@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file uploaded"}), 400 #Returns no file uploaded if user doesnt give any input
            
        file = request.files['file']
        
        # Read image
        file_bytes = np.frombuffer(file.read(), np.uint8)
        img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR) #flask gives file as bytes as opencv needs image format

        if img is None:
            return jsonify({"error": "Invalid image file"}), 400

        # Run YOLO object detection with a lower confidence threshold for difficult aerial images
        results = yolo_model(img, conf=0.05)
        
        # Collect all candidate boxes
        candidate_boxes = []
        for result in results:
            for box in result.boxes:
                cls_id = int(box.cls[0])
                if cls_id in [4, 14]: #filters relevant objects like aircrafts
                    x1, y1, x2, y2 = map(int, box.xyxy[0])
                    conf = float(box.conf[0])
                    candidate_boxes.append([x1, y1, x2, y2, conf])
        
        # Fallback: if no airplane detected even at low conf, grab top 10 confident boxes of ANY class
        if not candidate_boxes:
            for result in results:
                if len(result.boxes) > 0:
                    sorted_boxes = sorted(result.boxes, key=lambda b: float(b.conf[0]), reverse=True)
                    # Take up to top 10 boxes to support multi-plane images
                    for box in sorted_boxes[:10]:
                        x1, y1, x2, y2 = map(int, box.xyxy[0])
                        conf = float(box.conf[0])
                        candidate_boxes.append([x1, y1, x2, y2, conf])
                    
        if not candidate_boxes:
            return jsonify({"message": "No aircraft detected"})
            
        # Apply Non-Maximum Suppression (NMS) to remove overlapping double-boxes
        import cv2 as cv
        boxes_for_nms = []
        scores_for_nms = []
        for b in candidate_boxes:
            x1, y1, x2, y2, conf = b
            boxes_for_nms.append([x1, y1, x2 - x1, y2 - y1]) # x, y, w, h
            scores_for_nms.append(conf)
            
        indices = cv.dnn.NMSBoxes(boxes_for_nms, scores_for_nms, score_threshold=0.0, nms_threshold=0.3)
        
        airplane_boxes = []
        if len(indices) > 0:
            for i in indices.flatten():
                airplane_boxes.append(candidate_boxes[i])

        # Draw on image and classify specific types
        top_predictions = []
        display_img = img.copy()
        
        for idx, (x1, y1, x2, y2, conf) in enumerate(airplane_boxes):
            # Ensure coordinates are within image bounds
            h, w, _ = img.shape
            cx1, cy1, cx2, cy2 = max(0, x1), max(0, y1), min(w, x2), min(h, y2)
            
            if cx2 <= cx1 or cy2 <= cy1:
                continue
                
            crop = img[cy1:cy2, cx1:cx2].copy()
            
            # Square pad the crop to preserve aspect ratio (fixes Keras misclassifications)
            ch, cw = crop.shape[:2]
            max_dim = max(ch, cw)
            top = (max_dim - ch) // 2
            bottom = max_dim - ch - top
            left = (max_dim - cw) // 2
            right = max_dim - cw - left
            padded_crop = cv.copyMakeBorder(crop, top, bottom, left, right, cv.BORDER_CONSTANT, value=[128, 128, 128])
            
            # Prepare crop for Keras model
            crop_rgb = cv.cvtColor(padded_crop, cv.COLOR_BGR2RGB)
            crop_resized = cv.resize(crop_rgb, (80, 80))
            crop_normalized = crop_resized / 255.0
            crop_input = np.reshape(crop_normalized, (1, 80, 80, 3))
            
            # Predict the specific label
            pred = model.predict(crop_input)[0]
            best_idx = int(np.argmax(pred))
            best_conf = float(pred[best_idx])
            best_label = class_labels[best_idx] #gets best class label
            
            # Store the prediction for this bounding box
            label_text = f"{best_label}"
            top_predictions.append({
                "label": label_text,
                "confidence": best_conf,
                "box": [x1, y1, x2, y2]
            })
            
            # Draw bounding box and label on display_img
            label_display = f"{best_label} ({best_conf*100:.1f}%)"
            color = (0, 255, 0)
            cv.rectangle(display_img, (x1, y1), (x2, y2), color, 2) #draws the results
            cv.putText(display_img, label_display, (x1, max(y1-10, 10)), cv.FONT_HERSHEY_SIMPLEX, 0.6, color, 2)

        # Convert image to base64 
        _, buffer = cv.imencode('.jpg', display_img)
        img_base64 = base64.b64encode(buffer).decode('utf-8') #json cannot send images directly 

        #send image and prediction to frontend
        return jsonify({
            "top_predictions": top_predictions,
            "image_with_boxes": f"data:image/jpeg;base64,{img_base64}"
        })

    #prevents crash and any runtime errors
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)