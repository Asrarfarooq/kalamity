import React from "react";
import "./App.css";
import MapWithDisasters from "./components/MapWithDisasters";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="logo">Logo</div>
        <button className="help-button">Help</button>
      </header>
      <div className="content">
        <div className="map-container">
          <div className="map" id="map">
            <MapWithDisasters />
          </div>
        </div>
        <div className="resources-filter">Resources</div>
      </div>
      <div className="lower-content">
        <div className="chatbot-container">
          ChatBot Tuned For Disaster Preparedness
        </div>
        <div className="distress-column">
          <button className="emergency-call">Emergency Call</button>
          <button className="distress-signal">Send Distress Signal</button>
        </div>
      </div>
    </div>
  );
}

export default App;
