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

  return (
    <div className="distress-column" style={{ padding: "20px" }}>
      <button className="button emergency-call" onClick={handleEmergencyCall}>
        Call Emergency Number
      </button>
      <button className="button distress-signal" onClick={sendDistressSignal}>
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
