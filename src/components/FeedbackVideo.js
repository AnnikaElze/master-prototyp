import Webcam from "react-webcam";
import {useEffect, useRef, useState} from "react";
import {FilesetResolver, HandLandmarker} from "@mediapipe/tasks-vision";

function FeedbackVideo (props) {
  const windowSize = useRef([window.innerWidth, window.innerHeight])

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [handPresence, setHandPresence] = useState(null);

  const videoConstraints = {
    width: { min: 0.485 * windowSize.current[0] },
    height: { min: 0.49 * windowSize.current[1] },
    aspectRatio: 1,
  };

  return(
    <>
      <div className="feedbackGridVideo">
        <div className="feedbackGridVideoItem">
          <Webcam videoConstraints={videoConstraints} width={ 0.485 * windowSize.current[0] }
          height={ 0.49 * windowSize.current[1] }></Webcam>
          <canvas className="feedbackCanvas"></canvas>
        </div>
        <div className="feedbackGridVideoItem">
          <Webcam videoConstraints={videoConstraints} width={0.485 * windowSize.current[0]}
                  height={0.49 * windowSize.current[1]}></Webcam>
          <canvas className="feedbackCanvas"></canvas>
        </div>
      </div>
    </>
  )
}

export default FeedbackVideo;