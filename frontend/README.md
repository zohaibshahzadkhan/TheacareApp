# Theacare Demo - Face Capture & Lighting Check

A Next.js web application that performs real-time face centering and lighting checks using webcam input. Built with React, MediaPipe Face Detection, Tailwind CSS, and modern browser APIs.


## Features

- Real-time face detection and alignment feedback
- Lighting condition check for optimal photo capture
- Capture photos when conditions are met
- Full video frame analysis for accurate detection
- Responsive UI styled with Tailwind CSS

## Technologies & Libraries Used

- **Next.js** - React framework for server-side rendering and routing
- **React** - UI library for building interactive components
- **Tailwind CSS** - Utility-first CSS framework
- **MediaPipe Face Detection** - Google's face detection library
- **Browser APIs**:
  - `navigator.mediaDevices.getUserMedia` for webcam access
  - `<canvas>` for rendering video frames and overlays

## Architecture Overview

The app uses a hybrid approach combining:

- Real-time face detection via MediaPipe
- Canvas rendering for video frames and detection overlays
- Hidden video element with canvas-processed output
- Full-frame analysis for accurate positioning and lighting

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Modern browser with webcam support (Chrome/Firefox/Edge/Safari)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/zohaibshahzadkhan/TheacareApp.git
   cd TheacareApp/frontend
   ```
2. Create .env.local file and set this environment variable:
    ```bash 
    NEXT_PUBLIC_API_BASE=http://localhost:8000
    ```
3. Install dependencies:
    ```
    npm install
    ```

4. Run development server:
   
   ```
   npm run dev
  