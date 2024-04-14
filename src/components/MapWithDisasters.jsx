import React, { useEffect, useRef } from "react";
import axios from "axios";

const MapWithDisasters = () => {
  const googleMapRef = useRef(null);
  const userMarkerRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      const defaultLocation = { lat: -34.397, lng: 150.644 };
      const googleMap = new window.google.maps.Map(googleMapRef.current, {
        zoom: 2,
        center: defaultLocation,
      });

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            googleMap.setCenter(userLocation);
            googleMap.setZoom(8); // Zoom in closer

            if (userMarkerRef.current) {
              userMarkerRef.current.setPosition(userLocation);
            } else {
              userMarkerRef.current = new window.google.maps.Marker({
                position: userLocation,
                map: googleMap,
                title: "Your Location",
                icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
              });
            }
          },
          (error) => {
            console.error("Geolocation error:", error);
          },
          { enableHighAccuracy: true }
        );
      }

      fetchDisastersAndEarthquakes(googleMap);
    };

    initMap();
  }, []);

  const fetchDisastersAndEarthquakes = async (googleMap) => {
    try {
      const [eonetResponse, usgsResponse] = await Promise.all([
        axios.get("https://eonet.gsfc.nasa.gov/api/v3/events/geojson"),
        axios.get(
          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"
        ),
      ]);

      eonetResponse.data.features.forEach((feature) => {
        const coords = feature.geometry.coordinates;
        const latLng = new window.google.maps.LatLng(coords[1], coords[0]);
        const date = new Date(feature.properties.date).toLocaleString();

        const marker = new window.google.maps.Marker({
          position: latLng,
          map: googleMap,
          title: feature.properties.title,
          icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        });

        const infowindow = new window.google.maps.InfoWindow({
          content: `
            <div>
              <strong>${feature.properties.title}</strong>
              <p>Type: ${feature.properties.categories[0].title}</p>
              <p>Date: ${date}</p>
            </div>
          `,
        });

        marker.addListener("click", () => {
          infowindow.open({
            anchor: marker,
            map: googleMap,
            shouldFocus: false,
          });
        });
      });

      usgsResponse.data.features.forEach((earthquake) => {
        const coords = earthquake.geometry.coordinates;
        const latLng = new window.google.maps.LatLng(coords[1], coords[0]);
        const magnitude = earthquake.properties.mag;
        const time = new Date(earthquake.properties.time).toLocaleString();

        const marker = new window.google.maps.Marker({
          position: latLng,
          map: googleMap,
          title: `Earthquake: ${magnitude}`,
          icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        });

        const infowindow = new window.google.maps.InfoWindow({
          content: `
            <div>
              <strong>Earthquake</strong>
              <p>Magnitude: ${magnitude}</p>
              <p>Time: ${time}</p>
            </div>
          `,
        });

        marker.addListener("click", () => {
          infowindow.open({
            anchor: marker,
            map: googleMap,
            shouldFocus: false,
          });
        });
      });
    } catch (error) {
      console.error("Error fetching disaster data:", error);
    }
  };

  return <div ref={googleMapRef} style={{ width: "100%", height: "100%" }} />;
};

export default MapWithDisasters;
