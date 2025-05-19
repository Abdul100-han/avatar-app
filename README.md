# Threadswift 3D Avatar Fitting App

A web application for uploading and visualizing 3D avatars with clothing using Next.js, React Three Fiber, and Material UI.

## Features

- Upload 3D avatar models (GLB/GLTF format)
- Upload 3D clothing models (GLB/GLTF format)
- Visualize avatar with clothing
- Toggle clothing visibility
- Change clothing color
- Interactive 3D scene with orbit controls
- Responsive Material UI interface

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Yarn or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Abdul100-han/avatar-app.git
cd threadswift-avatar-app
Install dependencies:

bash
yarn install
Run the development server:

bash
yarn dev
Open http://localhost:3000 in your browser


Usage
Click "Upload Avatar" to select a GLB/GLTF file for the avatar

Click "Upload Clothing" to select a GLB/GLTF file for the clothing

Use the controls in the "Adjust" tab to:

Toggle clothing visibility

Change clothing color

Reset the camera view

Clear the scene

Built With
Next.js - React framework

React Three Fiber - Three.js for React

Material UI - React UI component library

Three.js - 3D library

Screenshots
Screenshot 1
Screenshot 2



This implementation includes all the required features:

1. Upload buttons for both avatar and clothing (GLB/GLTF)
2. 3D viewport with OrbitControls
3. UI panel with all required controls using Material UI
4. Basic auto-fit functionality
5. Proper lighting setup
6. Camera controls (orbit, zoom, pan)

Bonus features included:
1. Drag-and-drop upload
2. Color picker for clothing
4. Responsive design