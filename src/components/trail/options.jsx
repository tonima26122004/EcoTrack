import React, { useState, useEffect } from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const RegionSelector = () => {
  const [product, setProduct] = useState("Carbon-Free Products");
  const [city, setCity] = useState("Kolkata");
  const [state, setState] = useState("West Bengal");
  const [country, setCountry] = useState("India");
  const [mapCenter, setMapCenter] = useState([22.5726, 88.3639]);

  const stores = [
    {
      id: 1,
      name: "Green Mail",
      phone: "+91 4841684565",
      address: "Samiopola, Bishnipur, Kolkata, West Bengal",
      position: [22.5726, 88.3639]
    },
  ];

  useEffect(() => {
    const cityCoordinates = {
      Kolkata: [22.5726, 88.3639],
      Mumbai: [19.0760, 72.8777],
      Delhi: [28.7041, 77.1025]
    };
    setMapCenter(cityCoordinates[city] || cityCoordinates.Kolkata);
  }, [city]);

  return (
    <div className="p-6 sm:p-2 rounded-lg w-full max-w-3xl text-[#1D3B1F] text-base mx-auto">
      {/* Product Selection */}
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
                value={city}
                onChange={(e) => setCity(e.target.value)}
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
                value={state}
                onChange={(e) => setState(e.target.value)}
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
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="text-green-600 focus:outline-none text-lg w-full sm:w-auto"
              >
                <option>India</option>
                <option>USA</option>
              </select>
            </div>
          </div>
          <button className="p-3 text-[#1D3B1F] flex-shrink-0 bg-gray-200 rounded-full">
            <FaSearch className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* New Section: 'or' and 'Add Current Location' */}
      <div className="flex items-center w-full gap-3 my-4">
        {/* <span className="text-[#1D3B1F] text-lg">or</span> */}
        {/* <button
          className="flex items-center gap-2 bg-white border border-[#1D3B1F] text-[#1D3B1F] px-4 py-2 rounded-full shadow-md text-sm"
        >
          <FaMapMarkerAlt /> Add Your Current Location
        </button> */}
      </div>

      {/* Map Section */}
      <div className="mt-6 bg-[#C0F2CB] rounded-xl overflow-hidden" style={{ height: '400px' }}>
        <MapContainer
          center={mapCenter}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {stores.map((store) => (
            <Marker key={store.id} position={store.position}>
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-green-800">{store.name}</h3>
                  <p className="text-sm">{store.phone}</p>
                  <p className="text-sm mt-1">{store.address}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default RegionSelector;
