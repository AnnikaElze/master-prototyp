import React, {useEffect, useRef} from "react";
import {DrawingUtils, FilesetResolver, PoseLandmarker} from "@mediapipe/tasks-vision";
import pose_landmarker_task from "../../shared/models/pose_landmarker_lite.task";

function PoseLandmarks (props) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let poseLandmarker;
    let animationFrameId;

    console.log('PoseLandmarks CameraID' + props.camera);

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
            outputSegmentationMasks: true,
            delegate: "GPU"
          }
        );
        detectPoses();
      } catch (error) {
        console.error("Error initializing pose detection:", error);
      }
    };

    const drawLandmarks = (landmarks, mask) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      // const segmentationMask = mask.getAsFloat32Array();

      ctx.canvas.width = Math.floor(window.innerWidth * 0.485);
      ctx.canvas.height = Math.floor(window.innerHeight * 0.55);

      const drawingUtils = new DrawingUtils(ctx);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ColorMapCreator(segmentationMask);

      if (props.video === 1){
        landmarks.forEach(landmark => {
          drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS, {color: 'white', lineWidth: 1});
          drawingUtils.drawLandmarks(landmark, {color: 'white', radius: 1});
        });
      } else {
        landmarks.forEach(landmark => {
          drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS, {color: 'white', lineWidth: 1});
          drawingUtils.drawLandmarks(landmark, {color: 'white', radius: 1});
        });
      }
    };

    const detectPoses = () => {
      if (videoRef.current && videoRef.current.readyState >= 2) {
        const detections = poseLandmarker.detectForVideo(videoRef.current, performance.now());

        if (detections.landmarks) {
          drawLandmarks(detections.landmarks, detections.segmentationMasks);
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

  function feedbackDecision(feedbackTypes) {
    if (feedbackTypes.includes('overlay')){
      return (
        <>
          <video ref={videoRef} autoPlay playsInline className="feedbackWebcam"></video>
          <canvas ref={canvasRef} className="feedbackCanvas"></canvas>
        </>
      )
    } else {
      return (
        <>
          <video ref={videoRef} autoPlay playsInline className="feedbackWebcam"></video>
          <canvas ref={canvasRef} className="feedbackCanvasDisabled"></canvas>
        </>
      )
    }
  }

  return (
    <>
      {feedbackDecision(props.feedbackTypes)}
    </>
  )
}

export default PoseLandmarks;