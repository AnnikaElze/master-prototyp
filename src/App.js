import './App.css';
import {ThemeProvider} from "@emotion/react";
import "@fontsource/roboto-mono";
import "@fontsource/roboto";
import Homepage from "./components/Homepage";
import theme from "./components/Theme";
import React, {useState} from "react";
import Feedback from "./components/Feedback";

/**
 * @creates root - for the distinction between feedback mode and home screen
 *          usecase - for the distinction between stretching and handstand
 * @children Homepage | Feedback
 */

let rootStyle = {
  backgroundColor: theme.palette.background,
  height: '100vh',
}

function App() {
  const [root, setRoot] = useState(true);
  const [usecase, setUsecase] = useState("");

  const [camera1, setCamera1] = useState();
  const [camera2, setCamera2] = useState();

  const [reset1, setReset1] = useState(false);
  const [reset2, setReset2] = useState(false);

  let handleRoot = (usecase) => {
      setUsecase(usecase);
      setRoot(!root);
  }

  const handleCamera1 = (event) => {
    setCamera1(event.target.value);
    setReset1(true);
    setInterval(() => {
      setReset1(false);
    }, 1000);
  };

  const handleCamera2 = (event) => {
    setCamera2(event.target.value);
    setReset2(true);
    setInterval(() => {
      setReset2(false);
    }, 3000);
  };

  let rootDecision = () => {
    if (root) {
      return <Homepage handleRoot={handleRoot}/>
    } else {
      return <Feedback handleRoot={handleRoot} usecase={usecase} handleCamera1={handleCamera1} handleCamera2={handleCamera2}
      camera1={camera1} camera2={camera2} reset1={reset1} reset2={reset2}/>}
    }

  return (
    <div className="App" style={rootStyle}>
      <ThemeProvider theme={theme}>
        {rootDecision()}
      </ThemeProvider>
    </div>
  );
}


export default App;