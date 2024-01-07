import React, {useEffect, useRef, useState} from "react";
import {FilesetResolver, PoseLandmarker} from "@mediapipe/tasks-vision";
import pose_landmarker_task from "../shared/models/pose_landmarker_full.task";

function PoseLandmarks (props) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let poseLandmarker;
    let animationFrameId;

    const initializeHandDetection = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
        );
        poseLandmarker = await PoseLandmarker.createFromOptions(
          vision, {
            baseOptions: { modelAssetPath: pose_landmarker_task },
            numPoses: 1,
            runningMode: "video"
          }
        );
        detectPoses();
      } catch (error) {
        console.error("Error initializing pose detection:", error);
      }
    };

    const drawLandmarks = (landmarksArray) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';

      landmarksArray.forEach(landmarks => {
        landmarks.forEach(landmark => {
          const x = landmark.x * canvas.width;
          const y = landmark.y * canvas.height;

          ctx.beginPath();
          ctx.arc(x, y, 2, 0, 2 * Math.PI); // Draw a circle for each landmark
          ctx.fill();
        });
      });
    };

    const detectPoses = () => {
      if (videoRef.current && videoRef.current.readyState >= 2) {
        const detections = poseLandmarker.detectForVideo(videoRef.current, performance.now());

        if (detections.landmarks) {
          drawLandmarks(detections.landmarks);
        }
      }
      requestAnimationFrame(detectPoses);
    };

    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        await initializeHandDetection();
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    startWebcam();

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

  return(
    <>
      <video ref={videoRef} autoPlay playsInline className="feedbackWebcam"></video>
      <canvas ref={canvasRef} className="feedbackCanvas"></canvas>
    </>
  )
}

export default PoseLandmarks;

// style={{backgroundColor: "black", width: "600px", height: "480px"}}