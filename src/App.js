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

  let handleRoot = (usecase) => {
      setUsecase(usecase);
      setRoot(!root);
  }

  let rootDecision = () => {
    if (root) {
      return <Homepage handleRoot={handleRoot}/>
    } else {
      return <Feedback handleRoot={handleRoot} usecase={usecase}/>}
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