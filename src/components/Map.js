
import React, { useCallback, useState } from "react";
import { GoogleMap, useLoadScript, InfoWindow } from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  width: "50vw",
  height: "50vh",
};
const center = {
  lat: -34.397,
  lng: 150.644,
};
const options = {
  zoom: 6,
};

function MapComponent() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Add your API key here
    libraries,
  });

  const [map, setMap] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);
  const [location, setLocation] = useState(null);

  const onMapLoad = useCallback((map) => {
    setMap(map);
    const infoWindow = new window.google.maps.InfoWindow();
    setInfoWindow(infoWindow);

    const locationButton = document.createElement("button");
    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");

    map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(locationButton);

    locationButton.addEventListener("click", () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent("Location found.");
            infoWindow.open(map);
            map.setCenter(pos);
            setLocation(pos);
          },
          () => {
            handleLocationError(true, infoWindow, map.getCenter());
          }
        );
      } else {
        handleLocationError(false, infoWindow, map.getCenter());
      }
    });
  }, []);

  const handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      id="map"
      mapContainerStyle={mapContainerStyle}
      zoom={options.zoom}
      center={center}
      onLoad={onMapLoad}
    >
      {location && (
        <InfoWindow position={location} onCloseClick={() => setLocation(null)}>
          <div>Current location</div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

export default MapComponent;

