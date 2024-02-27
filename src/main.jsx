import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import AudioContext from "./context/AudioContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AudioContext>
    <App />
  </AudioContext>
);
