import { LoadScript, GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const libraries = ["places", 'geometry']; // Optional, for geocoding or places search
const mapContainerStyle = {
  width: "100vw", // Adjust width and height as needed
  height: "400px",
};

const GoogleMaps = (coordinates) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD9B-0oisrbexDlVkhMzoHYyj0lLTE4EXc", // Replace with your API key
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading...";

  const markerData = {
    lat: coordinates.lat, 
    lng: coordinates.lng,
    title: "My Custom Marker", // Optional title for the marker
    description: "This is a custom marker I placed!", // Optional description
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={100}
      center={{ lat: coordinates.lat, lng: coordinates.lng }} // Adjust initial center coordinates as needed
    >
    <Marker
        key={markerData.lat + markerData.lng} // Use a unique key for each marker
        position={{ lat: markerData.lat, lng: markerData.lng }}
        title={markerData.title} // Optional title displayed on hover
        onClick={(event) => {
            // Access marker position here:
            const clickedMarkerLat = event.latLng.lat();
            const clickedMarkerLng = event.latLng.lng();
            // Use these values to zoom the map
          }}
    />
    </GoogleMap>
  );
};

export default GoogleMaps;
