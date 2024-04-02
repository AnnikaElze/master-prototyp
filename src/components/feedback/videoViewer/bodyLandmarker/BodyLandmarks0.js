import React, {useEffect, useRef} from "react";
import {FilesetResolver, PoseLandmarker} from "@mediapipe/tasks-vision";
import pose_landmarker_task from "../../../../shared/models/pose_landmarker_full.task";

/** Component overview
 * The BodyLandmarkers component is responsible for initializing the webcam,
 * detecting poses, and rendering the video.
 *
 * This code is adapted from:
 * https://codepen.io/mediapipe-preview/pen/xxJNjbN?editors=0010
 * (accessed on 02.04.2024)
 */

function BodyLandmarks0 (props) {
  // Reference to the video element
  const videoRef = useRef(null);

  useEffect(() => {
    // Variable to hold the PoseLandmarker instance
    let poseLandmarker;
    // ID for animation frame
    let animationFrameId;

    // Constraints for accessing the webcam
    const constraints = {
      video: {deviceId: {exact: props.camera}}
    }

    // Function to initialize pose detection
    const initializePoseDetection = async () => {
      try {
        // Load MediaPipe Pose Landmark model
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
        );
        // Create PoseLandmarker instance
        poseLandmarker = await PoseLandmarker.createFromOptions(
          vision, {
            baseOptions: { modelAssetPath: pose_landmarker_task },
            numPoses: 1,
            runningMode: "video",
            minPosePresenceConfidence: 0.8,
          }
        );
        // Start detecting poses
        detectPoses();
      } catch (error) {
        console.error("Error initializing pose detection:", error);
      }
    };

    // Function to detect poses from webcam stream
    const detectPoses = () => {
      if (videoRef.current && videoRef.current.readyState >= 2) {
        // Detect poses from the video element
        const detections = poseLandmarker.detectForVideo(videoRef.current, performance.now());

        // If landmarks are detected the DrawLandmarks function in the VideoViewer is called (over handleState)
        if (detections.landmarks) {
          props.handleState(detections.landmarks);
        }
      }
      requestAnimationFrame(detectPoses);
    };

    // Function to start webcam and pose detection
    const startWebcam = async () => {
      try {
        // Access user's webcam with constraints
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = stream;

        // Initialize pose detection
        await initializePoseDetection();
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    startWebcam();

    // Cleanup function
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
      if (poseLandmarker) {
        poseLandmarker.close();
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };

  }, []);

  // Render video element
  return (
    <video ref={videoRef} autoPlay playsInline className="feedbackWebcam"></video>
  )
}

export default BodyLandmarks0;