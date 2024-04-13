import React, { useEffect, useRef } from "react";
import axios from "axios";

const MapWithDisasters = () => {
  const googleMapRef = useRef(null);
  const googleMap = useRef(null);
  const userMarkerRef = useRef(null);

  // Function to fetch and plot disasters
  const fetchDisasters = async () => {
    try {
      const response = await axios.get(
        "https://eonet.gsfc.nasa.gov/api/v3/events/geojson"
      );
      const features = response.data.features;
      features.forEach((feature) => {
        const coords = feature.geometry.coordinates;
        const latLng = new window.google.maps.LatLng(coords[1], coords[0]);

        const marker = new window.google.maps.Marker({
          position: latLng,
          map: googleMap.current,
          title: feature.properties.title,
        });

        const infowindow = new window.google.maps.InfoWindow({
          content: `<div><strong>${feature.properties.title}</strong><p>Type: ${feature.properties.categories[0].title}</p></div>`,
        });

        marker.addListener("click", () => {
          infowindow.open({
            anchor: marker,
            map: googleMap.current,
            shouldFocus: false,
          });
        });
      });
    } catch (error) {
      console.error("Error fetching disaster data:", error);
    }
  };

  useEffect(() => {
    // Define the initMap function within useEffect
    const initMap = () => {
      const defaultLocation = { lat: -34.397, lng: 150.644 };
      googleMap.current = new window.google.maps.Map(googleMapRef.current, {
        zoom: 2,
        center: defaultLocation,
      });

      // Attempt to get the user's current position and place a marker
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            // If a marker already exists, update its position
            if (userMarkerRef.current) {
              userMarkerRef.current.setPosition(userLocation);
            } else {
              // Otherwise, create a new marker for the user's location
              userMarkerRef.current = new window.google.maps.Marker({
                position: userLocation,
                map: googleMap.current,
                title: "Your Location",
                icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Custom icon for user location
              });
            }

            // Center the map on the user's location
            googleMap.current.setCenter(userLocation);
            googleMap.current.setZoom(8); // Zoom in closer
          },
          (error) => {
            console.error("Geolocation error:", error);
          }
        );
      }

      // Fetch and plot the disasters on the map
      fetchDisasters();
    };

    // Load the Google Maps script dynamically
    const googleMapsScript = document.createElement("script");
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&callback=initMap`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    window.document.body.appendChild(googleMapsScript);

    // Assign the initMap function to the window object
    window.initMap = initMap;

    // Clean up the script on component unmount
    return () => {
      window.initMap = undefined;
      if (googleMapsScript.parentNode) {
        googleMapsScript.parentNode.removeChild(googleMapsScript);
      }
      if (googleMap.current) {
        googleMap.current = null;
      }
    };
  }, []);

  return <div ref={googleMapRef} style={{ width: "100%", height: "100%" }} />;
};

export default MapWithDisasters;
