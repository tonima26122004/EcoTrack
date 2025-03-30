import React, { useState } from "react";
import { FaSearch, FaPlus, FaMapMarkerAlt } from "react-icons/fa";

const StoreLocator = ({ selectedCity }) => {
  const [search, setSearch] = useState("");
  const [userLocation, setUserLocation] = useState(null);

  // ✅ Stores mapped to cities
  
    const stores = [
        { name: "Green Mall", phone: "+91 4841684565", address: "Samukpota, Bishnupur, Kolkata, WB", city: "Kolkata" },
        { name: "Eco Bazaar", phone: "+91 9876543210", address: "Salt Lake, Kolkata, WB", city: "Kolkata" },
        { name: "Organic Mart", phone: "+91 9123456789", address: "Park Street, Kolkata, WB", city: "Kolkata" },
        { name: "Earthly Goods", phone: "+91 9988776655", address: "Gariahat, Kolkata, WB", city: "Kolkata" },
      
        { name: "Nature's Basket", phone: "+91 5678901234", address: "Saket, Delhi", city: "Delhi" },
        { name: "Fresh Picks", phone: "+91 6789012345", address: "Connaught Place, Delhi", city: "Delhi" },
        { name: "Green Earth Market", phone: "+91 7890123456", address: "Hauz Khas, Delhi", city: "Delhi" },
        { name: "Eco Haven", phone: "+91 8765432109", address: "Karol Bagh, Delhi", city: "Delhi" },
      
        { name: "Green World Store", phone: "+91 9234567890", address: "Bandra, Mumbai, MH", city: "Mumbai" },
        { name: "Eco Mart", phone: "+91 8345678901", address: "Andheri, Mumbai, MH", city: "Mumbai" },
        { name: "Nature's Delight", phone: "+91 9456789012", address: "Dadar, Mumbai, MH", city: "Mumbai" },
        { name: "Sustainable Living", phone: "+91 9876123456", address: "Powai, Mumbai, MH", city: "Mumbai" }
      ];
      
 
  

  // 🔍 Filter stores based on search & selected city
  const filteredStores = stores.filter(
    (store) => store.city === selectedCity && store.name.toLowerCase().includes(search.toLowerCase())
  );

  // 📍 Get User's Current Location
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });

          // Open Google Maps with current location
          window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, "_blank");
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve your location. Please check your browser settings.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="p-4 rounded-lg mt-6 w-full mx-auto">
      {/* 🔹 Location Buttons */}
      <div className="flex items-center gap-3 mb-4">
        <div>
        <button className="flex items-center gap-2 border border-[#1D3B1F] text-[#1D3B1F] px-4 py-2 rounded-full shadow-md text-sm">
          <FaPlus /> Add Your Store Location
        </button>
        </div>
<div></div>
        <button
          onClick={handleGetLocation}
          className="flex items-center gap-2 bg-[#1D3B1F] text-white px-4 py-2 rounded-full shadow-md text-sm"
        >
          <FaMapMarkerAlt /> Choose Your Current Location
        </button>
      </div>

      <h2 className="text-lg font-semibold text-[#1D3B1F]">Store Details in {selectedCity}:</h2>
      <div className="bg-white p-3 rounded-lg shadow-md shadow-black mt-2">
        <h3 className="mt-4 text-[#1D3B1F] font-xl">Quick Search:</h3>

        {/* 🔍 Search Box */}
        <div className="flex items-center border border-[#1D3B1F] rounded-full overflow-hidden shadow-sm px-3 ">
          <input
            type="text"
            placeholder="Store : Eco_store"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow bg-transparent focus:outline-none text-sm p-2 text-gray-600"
          />
          <FaSearch className="text-[#1D3B1F]" />
        </div>

        {/* 📌 Store List with Search Filtering */}
        <div className="mt-2  ">
          {filteredStores.length > 0 ? (
            filteredStores.map((store, index) => (
              <div key={index} className="border-b last:border-b-0 py-4 text-sm text-[#1D3B1F]">
                <h4 className="font-semibold">{store.name}</h4>
                <p>{store.phone}</p>
                <p className="text-gray-500 text-xs">{store.address}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-2">No stores found in {selectedCity}.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreLocator;
