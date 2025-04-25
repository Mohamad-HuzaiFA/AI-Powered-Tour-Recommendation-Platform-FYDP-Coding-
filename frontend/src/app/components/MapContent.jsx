import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

function ChangeView({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView(coords, 13);
    }
  }, [coords]);
  return null;
}

function MapContent({ locationName = "Lahore" }) {
  const [coords, setCoords] = useState([31.5204, 74.3587]); // Default: Lahore

  useEffect(() => {
    const getCoordinates = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${locationName}`
        );
        const data = await res.json();
        if (data.length > 0) {
          setCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };
    getCoordinates();
  }, [locationName]);

  return (
    <MapContainer
      center={coords}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <ChangeView coords={coords} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coords}>
        <Popup>{locationName}</Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapContent;
