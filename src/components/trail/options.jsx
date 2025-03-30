import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import StoreLocator from "./location"; // Import StoreLocator

// 🔹 Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// 🔴 Custom Red Marker Icon
const redMarkerIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// 🔹 Component to update map center dynamically (Only updates when necessary)
const ChangeMapCenter = ({ center }) => {
  const map = useMap();
  map.setView(center, 13);
  return null;
};

const RegionSelector = () => {
  const [product, setProduct] = useState("Carbon-Free Products");

  // Stores selection values
  const [selectedLocation, setSelectedLocation] = useState({
    city: "Kolkata",
    state: "West Bengal",
    country: "India",
  });

  // Stores confirmed values (only updates on search)
  const [location, setLocation] = useState(selectedLocation);
  const [mapCenter, setMapCenter] = useState([22.5726, 88.3639]);

  const cityCoordinates = {
    Kolkata: [22.5726, 88.3639],
    Mumbai: [19.076, 72.8777],
    Delhi: [28.7041, 77.1025],
  };

  // 🔹 Function to update map only when search button is clicked
  const handleSearch = () => {
    setLocation(selectedLocation);
    setMapCenter(cityCoordinates[selectedLocation.city] || cityCoordinates.Kolkata);
  };

  return (
    <div className="p-6 sm:p-2 flex space-x-15 rounded-lg w-full text-[#1D3B1F] text-base mx-auto">
      {/* Product Selection */}
      <div>
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 text-lg">
        <span>Find nearest store for:</span>
        <select
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="bg-transparent text-green-600 underline cursor-pointer focus:outline-none text-lg"
        >
          <option>Carbon-Free Products</option>
          <option>Eco-Friendly Items</option>
        </select>
      </div>

      {/* Search Area */}
      <div className="flex flex-col sm:flex-row items-center h-14 border border-[#1D3B1F] rounded-lg sm:rounded-full shadow-md w-full sm:w-full mx-auto">
        <button className="bg-[#1D3B1F] text-white px-6 h-14 text-lg sm:rounded-l-full rounded-none w-52 sm:w-60">
          Select Region:
        </button>
        <div className="flex flex-wrap sm:flex-nowrap items-center w-full px-4 py-3 gap-3 sm:gap-5">
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full">
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
              <label className="text-[#1D3B1F]">City:</label>
              <select
                value={selectedLocation.city}
                onChange={(e) => setSelectedLocation({ ...selectedLocation, city: e.target.value })}
                className="text-green-600 focus:outline-none text-lg w-full sm:w-auto"
              >
                <option>Kolkata</option>
                <option>Mumbai</option>
                <option>Delhi</option>
              </select>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
              <label className="text-[#1D3B1F]">State:</label>
              <select
                value={selectedLocation.state}
                onChange={(e) => setSelectedLocation({ ...selectedLocation, state: e.target.value })}
                className="text-green-600 focus:outline-none text-lg w-full sm:w-auto"
              >
                <option>West Bengal</option>
                <option>Maharashtra</option>
                <option>Delhi</option>
              </select>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
              <label className="text-[#1D3B1F]">Country:</label>
              <select
                value={selectedLocation.country}
                onChange={(e) => setSelectedLocation({ ...selectedLocation, country: e.target.value })}
                className="text-green-600 focus:outline-none text-lg w-full sm:w-auto"
              >
                <option>India</option>
                <option>USA</option>
              </select>
            </div>
          </div>
          <button onClick={handleSearch} className="p-3 text-[#1D3B1F] flex-shrink-0 bg-gray-200 rounded-full">
            <FaSearch className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-6 bg-[#C0F2CB] rounded-xl overflow-hidden" style={{ height: "500px" }}>
        <MapContainer center={mapCenter} zoom={13} style={{ height: "100%", width: "100%" }}>
          {/* 🔹 Update map center dynamically */}
          <ChangeMapCenter center={mapCenter} />

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* 🔴 Red Marker at Selected City */}
          <Marker position={mapCenter} icon={redMarkerIcon}>
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-red-800">{location.city}</h3>
                <p className="text-sm">{location.state}, {location.country}</p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      </div>
      <div>
      {/* 🔹 Store Locator Component (Added here) */}
      <StoreLocator selectedCity={location.city} />
    </div>
    </div>
  );
};

export default RegionSelector;
