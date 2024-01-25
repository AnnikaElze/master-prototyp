import React, {useEffect, useRef} from "react";
import {FilesetResolver, PoseLandmarker} from "@mediapipe/tasks-vision";
import pose_landmarker_task from "../../../shared/models/pose_landmarker_full.task";

function BodyLandmarks (props) {
  const videoRef = useRef(null);

  useEffect(() => {
    let poseLandmarker;
    let animationFrameId;

    console.log('BodyLandmarks CameraID' + props.camera);

    const constraints = {
      video: {deviceId: {exact: props.camera}}
    }

    const initializePoseDetection = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
        );
        poseLandmarker = await PoseLandmarker.createFromOptions(
          vision, {
            baseOptions: { modelAssetPath: pose_landmarker_task },
            numPoses: 1,
            runningMode: "video",
            minPosePresenceConfidence: 0.8,
          }
        );
        detectPoses();
      } catch (error) {
        console.error("Error initializing pose detection:", error);
      }
    };

    const drawLandmarks = (landmarks) => {
      props.drawLandmarks(landmarks);
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
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = stream;
        await initializePoseDetection();
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

  return (
    <video ref={videoRef} autoPlay playsInline className="feedbackWebcam"></video>
  )
}

export default BodyLandmarks;