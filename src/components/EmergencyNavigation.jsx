import React, { useState, useEffect } from "react";
import "../Styles/EmergencyNavigation.css"; // Assuming you store your styles in this CSS file

const EmergencyNavigation = () => {
  const [userLocation, setUserLocation] = useState(null); // eslint-disable-line no-unused-vars
  const [shelter, setShelter] = useState(null); // eslint-disable-line no-unused-vars

  const [map, setMap] = useState(null);

  useEffect(() => {
    const mapElement = document.createElement("div");
    const defaultLocation = { lat: -34.397, lng: 150.644 };
    const googleMap = new window.google.maps.Map(mapElement, {
      center: defaultLocation,
      zoom: 15,
    });
    setMap(googleMap);
  }, []);

  const fetchUserLocationAndShelter = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(location);
        fetchNearestShelter(location);
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  };

  const fetchNearestShelter = (location) => {
    if (location && map) {
      const placesService = new window.google.maps.places.PlacesService(map);
      const request = {
        location: new window.google.maps.LatLng(location.lat, location.lng),
        radius: 5000, // Search within 5 kilometers
        type: ["disaster shelters near me"],
      };

      placesService.nearbySearch(request, (results, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          results.length
        ) {
          console.log("Nearest shelter found:", results[0]);
          setShelter(results[0]);
          confirmNavigation(location, results[0]);
        } else {
          console.error("No shelters found or error:", status);
        }
      });
    }
  };

  const confirmNavigation = (userLocation, shelter) => {
    const confirmResult = window.confirm(
      "Do you want to start navigation to the nearest disaster shelter?"
    );
    if (confirmResult) {
      startNavigation(userLocation, shelter);
    }
  };

  const startNavigation = (userLocation, shelter) => {
    const navigationUrl = `https://www.google.com/maps/dir/?api=1&origin=${
      userLocation.lat
    },${
      userLocation.lng
    }&destination=${shelter.geometry.location.lat()},${shelter.geometry.location.lng()}&travelmode=driving`;
    window.open(navigationUrl, "_blank");
  };

  const handleHelpButtonClick = () => {
    fetchUserLocationAndShelter();
  };

  return (
    <button onClick={handleHelpButtonClick} className="circular-button">
      <img
        src="https://cdn-icons-png.flaticon.com/512/3699/3699469.png"
        alt="Navigate"
      />
    </button>
  );
};

export default EmergencyNavigation;
