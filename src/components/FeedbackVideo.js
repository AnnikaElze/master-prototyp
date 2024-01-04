import Webcam from "react-webcam";
import {useRef} from "react";

function FeedbackVideo (props) {
  const windowSize = useRef([window.innerWidth, window.innerHeight])

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
        </div>
        <div className="feedbackGridVideoItem">
          <Webcam videoConstraints={videoConstraints} width={ 0.485 * windowSize.current[0] }
                  height={ 0.49 * windowSize.current[1] }></Webcam>
        </div>
      </div>
    </>
  )
}

export default FeedbackVideo;