import React, { useEffect, useRef, useCallback } from "react";
import axios from "axios";

const MapWithDisasters = () => {
  const googleMapRef = useRef(null);
  const googleMap = useRef(null);

  // Initialize and add the map once the Google Maps script is loaded
  const initMap = useCallback(() => {
    const defaultLocation = { lat: -34.397, lng: 150.644 };
    googleMap.current = new window.google.maps.Map(googleMapRef.current, {
      zoom: 2,
      center: defaultLocation,
    });

    // Request the user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          googleMap.current.setCenter(userLocation);
          new window.google.maps.Marker({
            position: userLocation,
            map: googleMap.current,
            title: "Your Location",
          });
        },
        (error) => {
          console.error(
            "Geolocation is not supported by this browser or permission was denied.",
            error
          );
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const fetchDisasters = async () => {
      try {
        const response = await axios.get(
          "https://eonet.gsfc.nasa.gov/api/v3/events/geojson"
        );
        const features = response.data.features;
        features.forEach((feature) => {
          const coords = feature.geometry.coordinates;
          const latLng = new window.google.maps.LatLng(coords[1], coords[0]);
          new window.google.maps.Marker({
            position: latLng,
            map: googleMap.current,
            title: feature.properties.title,
          });
        });
      } catch (error) {
        console.error("Error fetching disaster data:", error);
      }
    };

    if (googleMap.current) {
      fetchDisasters();
    }
  }, [initMap]);

  useEffect(() => {
    // Only load the script if it's not already present in the document
    if (!window.google || !window.google.maps) {
      const googleMapsScript = document.createElement("script");
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBk59VS_ou3LtdTbCxlXvkkBwheoZJcjto&callback=initGoogleMap`;
      googleMapsScript.async = true;
      googleMapsScript.defer = true;
      window.document.body.appendChild(googleMapsScript);
    } else {
      initMap();
    }

    return () => {
      window.initGoogleMap = undefined;
    };
  }, [initMap]);

  window.initGoogleMap = () => {
    if (window.google && window.google.maps) {
      initMap();
    } else {
      console.error("Google Maps JavaScript API not loaded");
    }
  };

  return (
    <div className="map-container">
      <div ref={googleMapRef} className="map" id="map"></div>
      <div className="key-info">Key info</div>
    </div>
  );
};

export default MapWithDisasters;
