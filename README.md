
# ✈️ Military Aircraft Detection & Classification Using CNN

<p align="center">
  <b>AI-Powered Object Detection and Multi-Class Aircraft Classification System</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.11-blue?style=for-the-badge&logo=python" />
  <img src="https://img.shields.io/badge/TensorFlow-Deep%20Learning-orange?style=for-the-badge&logo=tensorflow" />
  <img src="https://img.shields.io/badge/YOLOv8-Object%20Detection-purple?style=for-the-badge" />
  <img src="https://img.shields.io/badge/OpenCV-Computer%20Vision-green?style=for-the-badge&logo=opencv" />
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Flask-Backend-black?style=for-the-badge&logo=flask" />
</p>

---

## 🚀 Project Overview

**Military Aircraft Detection & Classification Using CNN** is an AI-powered computer vision system designed to automatically **detect, locate, and classify military aircraft from aerial images**.

The system combines **YOLOv8 object detection** with a **CNN-based deep learning classification model** to provide a two-stage aircraft recognition pipeline.

Instead of directly classifying the entire image, the system first identifies the aircraft using **bounding boxes**, extracts the detected aircraft region, and then performs detailed classification using deep visual features.

This approach helps improve recognition performance when aircraft appear at different scales, orientations, lighting conditions, or against complex backgrounds.

---

## 🎯 Objectives

- ✈️ Automatically detect aircraft within aerial images
- 🎯 Locate aircraft using bounding boxes
- 🧠 Extract meaningful visual features using CNN-based deep learning
- 🔍 Classify aircraft into multiple predefined categories
- 📊 Generate confidence scores for predictions
- 🖥️ Provide an interactive web-based interface
- ⚡ Combine object detection and classification into a unified pipeline
- 📈 Evaluate model performance using standard classification metrics

---

# 🔄 System Workflow

The complete system follows a **Detection → Extraction → Classification → Prediction → Visualization** pipeline.

```text
                    ┌─────────────────────┐
                    │     User Uploads     │
                    │    Aircraft Image    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    React Frontend   │
                    │  Image Upload/UI    │
                    └──────────┬──────────┘
                               │
                         HTTP POST
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Flask Backend    │
                    │    API Processing   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       OpenCV        │
                    │ Image Processing &  │
                    │ Format Conversion   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      YOLOv8         │
                    │  Object Detection   │
                    │                     │
                    │  ┌───────────────┐  │
                    │  │ Aircraft       │  │
                    │  │ Bounding Box   │  │
                    │  └───────────────┘  │
                    └──────────┬──────────┘
                               │
                         Aircraft Region
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Preprocessing    │
                    │                     │
                    │ • RGB Conversion    │
                    │ • Resize to 80×80    │
                    │ • Normalize [0,1]   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     CNN Model       │
                    │                     │
                    │ Feature Extraction  │
                    │ • Edges             │
                    │ • Textures          │
                    │ • Shapes            │
                    │ • Structures        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Classification   │
                    │      Softmax        │
                    │                     │
                    │ Multi-Class Aircraft│
                    │     Prediction      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Prediction Results  │
                    │                     │
                    │ • Aircraft Class    │
                    │ • Confidence Score  │
                    │ • Top-3 Predictions │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    React Frontend   │
                    │ Result Visualization│
                    └─────────────────────┘
````

### 🧩 How the System Works

**1️⃣ Image Upload**

The user uploads an aircraft image through the React-based web interface.

**2️⃣ Backend Processing**

The image is sent to the Flask backend through an HTTP `POST` request.

**3️⃣ Image Preprocessing**

OpenCV processes the uploaded image and converts it into the appropriate format for the deep learning pipeline.

**4️⃣ Object Detection**

YOLOv8 identifies aircraft within the image and generates **bounding boxes around the detected aircraft**.

**5️⃣ Region Extraction**

The detected aircraft region is isolated from the original image.

**6️⃣ Image Standardization**

The extracted aircraft image is:

* Converted to RGB
* Resized to `80 × 80` pixels
* Normalized to the `[0,1]` range

**7️⃣ CNN Feature Extraction**

The CNN processes the aircraft image and learns visual characteristics such as:

* Edges
* Textures
* Shapes
* Structural patterns

**8️⃣ Aircraft Classification**

The extracted features are passed through fully connected layers and a **Softmax classifier** to determine the aircraft category.

**9️⃣ Prediction Generation**

The system calculates confidence probabilities and selects the **Top-3 predicted aircraft classes**.

**🔟 Result Visualization**

The prediction results and confidence percentages are returned to the React frontend and displayed to the user.

This detection-first approach is an important part of the proposed system: **YOLOv8 locates the aircraft, while the CNN performs detailed classification.** 

---

# 🧠 AI Architecture

### 🔹 YOLOv8 — Object Detection

YOLOv8 is responsible for detecting aircraft within the input image.

It:

* Detects aircraft locations
* Generates bounding boxes
* Isolates relevant aircraft regions
* Provides the input region for subsequent classification

This allows the classifier to focus on the aircraft rather than irrelevant background information. 

### 🔹 CNN — Feature Extraction & Classification

The CNN model learns hierarchical visual representations.

Early layers learn:

```text
Edges → Textures → Shapes
```

Deeper layers learn:

```text
Aircraft Structure → Visual Patterns → Class-Specific Features
```

The extracted features are then passed through dense layers and a Softmax activation function for multi-class classification. 

---

# 🛠️ Technology Stack

| Category                | Technology          |
| ----------------------- | ------------------- |
| 🐍 Programming          | Python 3.11         |
| 🧠 Deep Learning        | TensorFlow / Keras  |
| 🎯 Object Detection     | Ultralytics YOLOv8  |
| 👁️ Computer Vision     | OpenCV              |
| 📊 Numerical Processing | NumPy, Pandas       |
| 📈 Visualization        | Matplotlib, Seaborn |
| ⚙️ Backend              | Flask               |
| 🌐 Frontend             | React + Vite        |
| 🎨 UI                   | Material UI         |
| 🔗 API Communication    | Flask-CORS          |
| 🧩 Model Format         | H5                  |

The documented implementation uses Python 3.11, React/Vite, Material UI, Flask, TensorFlow/Keras, OpenCV, NumPy, Flask-CORS and YOLOv8. 

---

# 📂 Project Structure

```text
militaryaircraftdetection/
│
├── backend/
│   ├── ...
│   └── ...
│
├── fighter-jet-ui/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── projectdata/
│   └── airplane-dataset-trans/
│       ├── ...
│       └── ...
│
├── clgproj.ipynb
│
├── README.md
│
└── ...
```

---

# 📊 Dataset & Preprocessing

The project uses aircraft images representing multiple aircraft categories, including **fighter aircraft, bombers, and transport aircraft**.

The dataset contains variations in:

* ✈️ Aircraft type
* 🔄 Orientation
* 💡 Lighting
* 🌄 Background
* 📐 Scale
* 🖼️ Image quality

These variations help evaluate the model under more realistic visual conditions. 

### Image Preprocessing

Each detected aircraft region undergoes:

```text
Original Image
      ↓
Aircraft Detection
      ↓
Bounding Box Extraction
      ↓
RGB Conversion
      ↓
80 × 80 Resize
      ↓
Pixel Normalization
      ↓
CNN Input
```

Data augmentation techniques such as **rotation, flipping, and scaling** are also used to improve generalization. 

---

# 📈 Model Evaluation

The system evaluates classification performance using:

### ✅ Accuracy

Measures the percentage of correctly classified samples.

### 🎯 Precision

Measures how accurately the model identifies a particular aircraft class.

### 🔍 Recall

Measures the model's ability to identify relevant aircraft samples.

### ⚖️ F1 Score

Provides a balance between precision and recall.

### 🧮 Confusion Matrix

Visualizes correct and incorrect predictions across aircraft categories.

The project documentation includes training/validation accuracy and loss analysis, confusion matrices, and prediction outputs with confidence scores. 

---

# 🖥️ Application Features

### ✈️ Aircraft Detection

Detects aircraft within uploaded images using YOLOv8.

### 🎯 Bounding Box Localization

Highlights the detected aircraft region.

### 🧠 AI-Based Classification

Classifies detected aircraft using a CNN-based deep learning model.

### 📊 Confidence Scores

Provides probability/confidence values for predictions.

### 🥇 Top-3 Predictions

Returns the three most probable aircraft classes.

### 🖼️ Image Preview

Allows users to preview uploaded images before processing.

### 🎨 Interactive UI

Provides a modern React + Material UI interface for uploading images and viewing predictions.

The frontend is designed to display the uploaded image and prediction results, while the Flask backend handles model inference and API communication. 

---

# 🔌 API Communication

The frontend communicates with the Flask backend using HTTP requests.

```text
React Frontend
      │
      │ HTTP POST
      ▼
Flask API
      │
      ▼
Image Processing
      │
      ▼
YOLOv8 Detection
      │
      ▼
CNN Classification
      │
      ▼
JSON Response
      │
      ▼
React Frontend
```

The backend returns prediction information in JSON format, including the aircraft classes and confidence scores. 

---

# ⚙️ Installation

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/RohanKarthikVarma/militaryaircraftdetection.git
cd militaryaircraftdetection
```

## 2️⃣ Create a Python Environment

```bash
python -m venv venv
```

### macOS / Linux

```bash
source venv/bin/activate
```

### Windows

```bash
venv\Scripts\activate
```

## 3️⃣ Install Backend Dependencies

```bash
pip install -r backend/requirements.txt
```

## 4️⃣ Install Frontend Dependencies

```bash
cd fighter-jet-ui
npm install
```

---

# ▶️ Running the Application

## Start the Flask Backend

From the project root:

```bash
python backend/app.py
```

The backend will start the API server.

## Start the React Frontend

Open another terminal:

```bash
cd fighter-jet-ui
npm run dev
```

Open the local development URL shown by Vite in your browser.

---

# 💡 Example Workflow

```text
User
 │
 │ Uploads aerial image
 ▼
React UI
 │
 │ HTTP POST
 ▼
Flask Backend
 │
 ▼
YOLOv8
 │
 │ Detects aircraft
 ▼
Bounding Box
 │
 │ Extract aircraft region
 ▼
OpenCV
 │
 │ Resize + Normalize
 ▼
CNN
 │
 │ Feature extraction
 ▼
Softmax Classifier
 │
 ▼
Top-3 Aircraft Predictions
 │
 ▼
Confidence Scores
 │
 ▼
React UI
```

---

# 🧪 Sample Predictions

The project documentation demonstrates detection/classification outputs for aircraft including:

* ✈️ B-2 Bomber
* ✈️ C-17 Globemaster

The documented results section includes aircraft detection outputs, training/validation performance, confusion-matrix analysis, and prediction confidence scores. 

---

# 🌍 Applications

Potential applications of the technology include:

* 🛡️ Defense surveillance
* 🛰️ Aerial image analysis
* 🚁 Drone-based monitoring
* ✈️ Aircraft recognition
* 🌐 Airspace monitoring
* 🔍 Computer vision research
* 🤖 Automated visual intelligence systems

---

# 🔬 Challenges Addressed

The project focuses on several challenging aspects of aerial aircraft recognition:

### 🔹 Small Objects

Aircraft may occupy only a small portion of an aerial image.

### 🔹 Complex Backgrounds

Clouds, terrain, buildings and other objects can make aircraft detection difficult.

### 🔹 Similar Aircraft Structures

Different aircraft can have visually similar shapes and structures.

### 🔹 Different Viewing Conditions

Aircraft may appear at different:

* Angles
* Scales
* Orientations
* Lighting conditions

Combining **YOLOv8 detection with CNN-based classification** helps address these challenges by first isolating the relevant aircraft region and then performing detailed classification. 

---

# 🚀 Future Enhancements

Possible future improvements include:

* 🎯 Improved small-object detection
* 🧠 More advanced CNN architectures
* ⚡ Real-time video-based aircraft detection
* 📹 Live camera/drone integration
* 📊 Larger and more diverse datasets
* 🔍 Improved detection of multiple aircraft in a single image
* ☁️ Cloud-based model deployment
* 📱 Mobile-friendly deployment
* 📈 Advanced model optimization
* 🛰️ Integration with aerial and satellite imagery

---

# 👨‍💻 Project Team

### 🎓 Academic Major Project

**Domain:** Computer Vision & Artificial Intelligence

**Role:** Team Lead & Developer

**Team Size:** 4

**Project Complexity:** Advanced

---

# 📚 Key Concepts

```text
Computer Vision
      ↓
Image Processing
      ↓
Object Detection
      ↓
YOLOv8
      ↓
Feature Extraction
      ↓
CNN / Deep Learning
      ↓
Transfer Learning
      ↓
Multi-Class Classification
      ↓
Confidence-Based Prediction
```

---

# ⭐ Key Takeaway

> **The core strength of this project is the combination of object detection and image classification.**

Instead of simply feeding an entire image into a classifier, the system first uses **YOLOv8 to locate the aircraft**, extracts the relevant region, and then uses a **CNN-based model to learn aircraft-specific visual features and classify the detected aircraft**.

This two-stage architecture provides a structured approach to automated aircraft recognition and improves the system's ability to handle complex aerial images.

---

## 📌 Project Information

**Project:** Military Aircraft Detection & Classification Using CNN
**Domain:** Computer Vision & Artificial Intelligence
**Object Detection:** YOLOv8
**Classification:** CNN / Deep Learning
**Backend:** Flask
**Frontend:** React + Vite
**Computer Vision:** OpenCV
**Deep Learning:** TensorFlow / Keras
**Language:** Python, JavaScript

---

<p align="center">
  <b>✈️ Built with Python, Deep Learning & Computer Vision</b>
  <br>
  <sub>Military Aircraft Detection & Classification System</sub>
</p>
