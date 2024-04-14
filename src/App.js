import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import MapWithDisasters from "./components/MapWithDisasters";
import ClamiBot from "./components/ClamiBot";
import DistressColumn from "./components/DistressColumn";
import EmergencyNavigation from "./components/EmergencyNavigation";
import ResourceComponent from "./components/ResourceComponent"; // Import the new component

const App = () => {
  const [apiLoaded, setApiLoaded] = useState(false);
  const [showDistressModal, setShowDistressModal] = useState(false);
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

  const handleDistressClick = () => {
    setShowDistressModal(true);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/" className="logo">
            Kalamity
          </Link>{" "}
          {/* Make logo a link to the homepage */}
          <div className="nav-buttons">
            <button className="distress-button" onClick={handleDistressClick}>
              Distress
            </button>
            <Link to="/Resources" className="resources-button">
              Resources
            </Link>
            <button className="help-button" onClick={handleHelpClick}>
              Help
            </button>
          </div>
          {emergencyNavigation && <EmergencyNavigation />}
        </header>
        <Routes>
          <Route path="/Resources" element={<ResourceComponent />} />{" "}
          {/* Updated to new component */}
          <Route
            path="/"
            element={
              <div className="main-body">
                {apiLoaded && (
                  <>
                    <div className="map-container">
                      <MapWithDisasters />
                    </div>
                    <div className="chatbot-container">
                      <ClamiBot />
                    </div>
                  </>
                )}
              </div>
            }
          />
        </Routes>
        {showDistressModal && (
          <div className="modal">
            <DistressColumn />
            <button onClick={() => setShowDistressModal(false)}>Close</button>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
