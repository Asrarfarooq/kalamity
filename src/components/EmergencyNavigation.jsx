import React, { useState, useEffect, useRef } from "react";

const EmergencyNavigation = ({ userLocation, apiKey }) => {
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [nearestShelter, setNearestShelter] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (window.google && window.google.maps) {
      initMap();
      findNearestShelter();
    } else {
      // Load the Google Maps API
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`;
      script.async = true;
      script.defer = true;
      window.document.body.appendChild(script);

      script.onload = () => {
        initMap();
        findNearestShelter();
      };
    }
  }, [apiKey, userLocation]);

  const initMap = () => {
    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 12,
      center: userLocation,
    });
    setMap(map);

    const directionsService = new window.google.maps.DirectionsService();
    setDirectionsService(directionsService);

    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    setDirectionsRenderer(directionsRenderer);
  };

  const findNearestShelter = () => {
    const places = new window.google.maps.places.PlacesService(map);
    const request = {
      location: new window.google.maps.LatLng(
        userLocation.lat,
        userLocation.lng
      ),
      radius: 5000,
      type: ["shelter"],
    };

    places.nearbySearch(request, (results, status) => {
      if (
        status === window.google.maps.places.PlacesServiceStatus.OK &&
        results.length > 0
      ) {
        setNearestShelter(results[0]);
        showDirections(userLocation, results[0].geometry.location);
      } else {
        console.error("No nearby shelters found.");
      }
    });
  };

  const showDirections = (start, end) => {
    const request = {
      origin: start,
      destination: end,
      travelMode: window.google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
      } else {
        console.error("Could not display directions due to:", status);
      }
    });
  };

  return (
    <div ref={mapRef} style={{ width: "100%", height: "400px" }}>
      {nearestShelter && (
        <div>
          <h3>Nearest Shelter:</h3>
          <p>{nearestShelter.name}</p>
        </div>
      )}
    </div>
  );
};

export default EmergencyNavigation;
