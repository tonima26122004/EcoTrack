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


        {marketData.map((item, index) => (
          <div key={index} className="bg-white border border-gray-200 p-4 rounded-lg shadow-md mb-4">
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