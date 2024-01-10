import './App.css';
import {ThemeProvider} from "@emotion/react";
import "@fontsource/roboto-mono";
import "@fontsource/roboto";
import Homepage from "./components/Homepage";
import theme from "./components/Theme";
import React, {useState} from "react";
import Feedback from "./components/Feedback";

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
      {/*<HandDetection/>*/}
    </div>
  );
}


export default App;