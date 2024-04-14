import React, { useState, useEffect } from "react";

const DistressColumn = () => {
  const [nearestPoliceStation, setNearestPoliceStation] = useState(null);
  const [placeService, setPlaceService] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (window.google && window.google.maps) {
      initMap();
    }
  }, []);

  const initMap = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(location);
        const map = new window.google.maps.Map(document.createElement("div"), {
          center: location,
          zoom: 15,
        });
        const places = new window.google.maps.places.PlacesService(map);
        setPlaceService(places);
      },
      (error) => {
        console.error("Error getting location:", error);
        const defaultLocation = { lat: -34.397, lng: 150.644 };
        setUserLocation(defaultLocation);
        const map = new window.google.maps.Map(document.createElement("div"), {
          center: defaultLocation,
          zoom: 15,
        });
        const places = new window.google.maps.places.PlacesService(map);
        setPlaceService(places);
      }
    );
  };

  const fetchNearestPoliceStation = () => {
    if (placeService && userLocation) {
      const request = {
        location: new window.google.maps.LatLng(
          userLocation.lat,
          userLocation.lng
        ),
        radius: 5000,
        type: ["police"],
      };

      placeService.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          if (results.length > 0) {
            setNearestPoliceStation(results[0]);
            console.log("Nearest police station found:", results[0]);
          } else {
            console.error("No nearby police stations found");
          }
        } else {
          console.error("Error fetching nearby police stations:", status);
        }
      });
    }
  };

  const handleEmergencyCall = () => {
    window.location.href = "tel:911";
  };

  const sendDistressSignal = () => {
    fetchNearestPoliceStation();
  };

  // Define inline styles
  const distressColumnStyle = {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#f8f8f8",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const buttonStyle = {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "10px 15px",
    margin: "10px",
    cursor: "pointer",
    width: "80%", // Set a width to the buttons
  };

  return (
    <div style={distressColumnStyle}>
      <button style={buttonStyle} onClick={handleEmergencyCall}>
        Call Emergency Number
      </button>
      <button style={buttonStyle} onClick={sendDistressSignal}>
        Send Distress Signal to Nearest Police
      </button>
      {nearestPoliceStation && (
        <div>
          <p>Nearest Police Station: {nearestPoliceStation.name}</p>
        </div>
      )}
    </div>
  );
};

export default DistressColumn;
