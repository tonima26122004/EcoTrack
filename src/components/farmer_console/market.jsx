import React, { useState, useEffect } from "react";
import Fnav from "./fnav";

const MarketPrices = () => {
  const [product, setProduct] = useState("Rice");
  const [products, setProducts] = useState(["Rice"]);
  const [marketData, setMarketData] = useState([
    {
      name: "Rice",
      avgPrice: "₹3,771 per quintal (₹37.71 per kg)",
      minPrice: "₹2,350 per quintal (₹23.50 per kg)",
      maxPrice: "₹4,900 per quintal (₹49.00 per kg)",
      priceUp: 1.5,
      priceDown: 1.0,
    }
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(console.error);
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product })
      });
      
      if (!response.ok) throw new Error('Prediction failed');
      
      const newData = await response.json();
      
      setMarketData([
        {
          name: newData.product,
          avgPrice: newData.avg_price,
          minPrice: newData.min_price,
          maxPrice: newData.max_price,
          priceUp: newData.trend_up,
          priceDown: newData.trend_down
        },
        ...marketData.slice(0, 2) // Keep max 3 results
      ]);
    } catch (error) {
      console.error("Prediction error:", error);
      alert(`Failed to predict for ${product}. Try another product.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#C0F2CB] min-h-screen font-lato px-4">
      <Fnav />
      <div className="bg-white p-4 rounded-lg">
<<<<<<< HEAD
        <div className="text-lg">Find Market Price for Your Product</div>
        
        <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-md w-full max-w-lg">
          <label className="font-semibold text-gray-700">Product:</label>
          <select
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="flex-grow border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            {products.map((p, i) => (
              <option key={i} value={p}>{p}</option>
            ))}
          </select>
          <button 
            onClick={handleSearch}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
            disabled={loading}
          >
            {loading ? '...' : '🔍'}
          </button>
        </div>
=======
      <div className="text-lg">Find Market Price for Your Product</div>
      <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-md w-full max-w-lg ">
        <label className="font-semibold  bg-[#082B13] text-white">Product:</label>
        <input
          type="text"
          value={product}
          onChange={handleSearch}
          className="flex-grow border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Enter product name..."
        />
        <button className="bg-[#082B13] text-white px-4 py-2 rounded-full">
          <img src="search.svg" alt="Search" className="w-5 h-5" />
        </button>
      </div>
>>>>>>> 792ad4b5430f0b5fe7370624b72ab0078f374223

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
          Real-Time Agro Market Prices
        </h2>

<<<<<<< HEAD
        {marketData.map((item, index) => (
          <div key={index} className="bg-white border border-gray-200 p-4 rounded-lg shadow-md mb-4">
=======
      {/* Market Cards */}
      {marketData.map((item, index) => (
        <div
          key={index}
          className="flex items-center space-x-4 mb-4"
        >
          {/* Product Image */}
          <img
            src="rice.svg"
            alt="Product"
            className="w-28 h-28 rounded-md"
          />

          {/* Market Details */}
          <div className="flex-grow">
>>>>>>> 792ad4b5430f0b5fe7370624b72ab0078f374223
            <h3 className="text-lg font-semibold text-green-700">{item.name}</h3>
            <p className="text-gray-600">Average Market Price: {item.avgPrice}</p>
            <p className="text-gray-600">Minimum Market Price: {item.minPrice}</p>
            <p className="text-gray-600">Maximum Market Price: {item.maxPrice}</p>
            <div className="flex space-x-4 mt-2">
              <span className="text-green-600 font-semibold">⬆ {item.priceUp}K</span>
              <span className="text-red-600 font-semibold">⬇ {item.priceDown}K</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketPrices;