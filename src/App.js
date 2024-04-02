import './App.css';
import {ThemeProvider} from "@emotion/react";
import "@fontsource/roboto-mono";
import "@fontsource/roboto";
import Homepage from "./components/Homepage";
import theme from "./components/Theme";
import React, {useState} from "react";
import Feedback from "./components/Feedback";

/** Component overview
 * This App component manages the state for controlling the display of different components
 * (Homepage and Feedback) based on user interaction.
 * It also manages the state of camera input devices.
 *
 * Created variables
 * - root
 * - usecase
 * - camera1/2
 * - reset1/2
 *
 * Used components
 * - Homepage
 * - Feedback
 */

// Define global styles
let rootStyle = {
  backgroundColor: theme.palette.background, // Set background color from theme
  height: '100vh', // Set height to occupy entire viewport
}

function App() {
  // State for toggling root view
  const [root, setRoot] = useState(true);

  // State for toggling use case
  const [usecase, setUsecase] = useState("");

  // States for id of camera device 1 and 2
  const [camera1, setCamera1] = useState();
  const [camera2, setCamera2] = useState();

  // States for resetting cool-down timer for id of camera device 1 and 2
  const [reset1, setReset1] = useState(false);
  const [reset2, setReset2] = useState(false);

  // Function to handle toggling root view and setting use case
  let handleRoot = (usecase) => {
      setUsecase(usecase);
      setRoot(!root);
  }

  // Function to handle changes in id of camera device 1
  const handleCamera1 = (event) => {
    setCamera1(event.target.value);
    setReset1(true);
    setInterval(() => {
      setReset1(false);
    }, 1000);
  };

  // Function to handle changes in id of camera device 2
  const handleCamera2 = (event) => {
    setCamera2(event.target.value);
    setReset2(true);
    setInterval(() => {
      setReset2(false);
    }, 3000);
  };

  // Function to determine which component to render based on root state (root = true -> Homepage)
  let rootDecision = () => {
    if (root) {
      return <Homepage handleRoot={handleRoot}/>
    } else {
      return <Feedback
        handleRoot={handleRoot}
        usecase={usecase}
        handleCamera1={handleCamera1}
        handleCamera2={handleCamera2}
        camera1={camera1}
        camera2={camera2}
        reset1={reset1}
        reset2={reset2}
      />
    }
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