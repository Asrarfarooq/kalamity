// app.js
import React, { useEffect, useState } from "react";
import "./App.css";
import MapWithDisasters from "./components/MapWithDisasters";
import DistressColumn from "./components/DistressColumn";
import EmergencyNavigation from "./components/EmergencyNavigation";
import ClamiBot from "./components/ClamiBot"; // Import the new ClamiBot component

const App = () => {
  const [apiLoaded, setApiLoaded] = useState(false);
  const [emergencyNavigation, setEmergencyNavigation] = useState(false);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        setApiLoaded(true);
        return;
      }
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places,geometry`;
      script.async = true;
      script.defer = true;
      script.onload = () => setApiLoaded(true);
      document.body.appendChild(script);
    };
    loadGoogleMaps();
  }, []);

  const handleHelpClick = () => {
    setEmergencyNavigation(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo">ClamiAlert</div>
        <button className="help-button" onClick={handleHelpClick}>
          Help
        </button>
        {emergencyNavigation && <EmergencyNavigation />}
      </header>
      <div className="content">
        <div className="map-container">{apiLoaded && <MapWithDisasters />}</div>
        <div className="resources-filter">Resources</div>
      </div>
      <div className="lower-content">
        <div className="chatbot-container">
          <ClamiBot />
        </div>
        <div className="distress-column">{apiLoaded && <DistressColumn />}</div>
      </div>
    </div>
  );
};

export default App;
