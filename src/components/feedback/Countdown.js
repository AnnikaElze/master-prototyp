import {useEffect, useState} from "react";

/*
Sound Effect by UNIVERSFIELD https://pixabay.com/de/users/universfield-28281460/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=124464
from Pixabay https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=124464
 */

function Countdown (props) {
  const [countdown, setCountdown] = useState(props.countdown);
  const [progress, setProgress] = useState(0);



  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
      setProgress((prevProgress) => prevProgress + (100 / props.countdown));

      if (countdown <= 0) {
        clearInterval(interval);

        props.handleExerciseState(props.exerciseState + 1, 1);
      }
    }, 1000);

    return () => clearInterval(interval);

  }, [countdown]);

  return (
    <div className="countdown">
      <div
        className="countdownProgress"
        style={{
          width: `${progress}%`,
        }}/>
    </div>
  );

}

export default Countdown;