#testing yolo performance
import cv2
import glob
from ultralytics import YOLO

# load yolo
yolo_model = YOLO("yolov8n.pt")

# find a B-2 image
files = glob.glob(r"..\projectdatawithannotations\airplane-dataset-trans\B-2\*.jpg")
if not files:
    print("No images found.")
else:
    for img_path in files[:2]:
        print(f"Testing {img_path}")
        img = cv2.imread(img_path)
        # default conf
        results = yolo_model(img)
        for r in results:
            print("Default conf boxes:", len(r.boxes))
            for b in r.boxes:
                print("cls:", int(b.cls[0]), "conf:", float(b.conf[0]))
        
        # low conf 
        results_low = yolo_model(img, conf=0.05)
        for r in results_low:
            print("Low conf boxes:", len(r.boxes))
            for b in r.boxes:
                print("cls:", int(b.cls[0]), "conf:", float(b.conf[0]))
