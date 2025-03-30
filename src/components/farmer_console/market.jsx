import React, { useState, useEffect } from "react";
import Fnav from "./fnav";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MarketPrices = () => {
  const [product, setProduct] = useState("Rice");
  const [products, setProducts] = useState(["Rice", "Wheat", "Corn", "Soybean"]);
  const [marketData, setMarketData] = useState([
    {
      name: "Rice",
      avgPrice: "₹3,771 per quintal (₹37.71 per kg)",
      minPrice: "₹2,350 per quintal (₹23.50 per kg)",
      maxPrice: "₹4,900 per quintal (₹49.00 per kg)",
      priceUp: 1.5,
      priceDown: 1.0,
      trendData: [3500, 3700, 3600, 3771, 3900, 3850, 4000],
      trendLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
    {
      name: "Wheat",
      avgPrice: "₹3,045 per quintal (₹30.45 per kg)",
      minPrice: "₹1,918 per quintal (₹19.18 per kg)",
      maxPrice: "₹3,938 per quintal (₹39.36 per kg)",
      priceUp: 1.2,
      priceDown: 0.8,
      trendData: [2800, 2950, 3045, 3200, 3100, 3300, 3400],
      trendLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
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
          priceDown: newData.trend_down,
          trendData: newData.trend_data || [3000, 3200, 3400, 3600, 3500, 3700, 3800],
          trendLabels: newData.trend_labels || ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        },
        ...marketData.slice(0, 1) // Keep max 2 results
      ]);
    } catch (error) {
      console.error("Prediction error:", error);
      alert(`Failed to predict for ${product}. Try another product.`);
    } finally {
      setLoading(false);
    }
  };

  const getChartData = (item) => {
    return {
      labels: item.trendLabels,
      datasets: [
        {
          label: 'Price Trend (₹/quintal)',
          data: item.trendData,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.3,
          fill: true,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `₹${context.parsed.y.toLocaleString('en-IN')}/quintal`;
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: function(value) {
            return `₹${value.toLocaleString('en-IN')}`;
          }
        }
      }
    }
  };

  return (
    <div className="bg-[#C0F2CB] min-h-screen font-lato px-4">
      <Fnav />
      <div className="bg-white p-6 rounded-lg max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left side - Product selection and price cards */}
          <div className="md:w-1/2">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Eco-Talk</h1>
            <h2 className="text-xl font-semibold text-gray-700 mb-6">
              Find Market Price for Your Product
            </h2>
            
            <div className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow-md w-full">
              <label className="font-semibold text-gray-700">Product:</label>
              <select
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                {products.map((p, i) => (
                  <option key={i} value={p}>{p}</option>
                ))}
              </select>
              <button 
                onClick={handleSearch}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    Search
                  </>
                )}
              </button>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Real-Time Agro Market Prices
            </h2>

            {marketData.map((item, index) => (
              <div key={index} className="bg-white border border-gray-200 p-4 rounded-lg shadow-md mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-green-700">{item.name}</h3>
                    <p className="text-gray-600 mt-1">
                      <span className="font-medium">Avg:</span> {item.avgPrice}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Min:</span> {item.minPrice}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Max:</span> {item.maxPrice}
                    </p>
                    <div className="flex space-x-4 mt-2">
                      <span className="text-green-600 font-semibold flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                        </svg>
                        {item.priceUp}K
                      </span>
                      <span className="text-red-600 font-semibold flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                        {item.priceDown}K
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Price trend graphs */}
          <div className="md:w-1/2">
            <div className="sticky top-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Price Trends (Last 6 Months)
              </h2>
              
              {marketData.map((item, index) => (
                <div key={index} className="bg-white border border-gray-200 p-4 rounded-lg shadow-md mb-6">
                  <h3 className="text-lg font-bold text-green-700 mb-3">{item.name} Price Trend</h3>
                  <div className="h-64">
                    <Line data={getChartData(item)} options={chartOptions} />
                  </div>
                  <div className="mt-3 text-sm text-gray-500">
                    <p>Last updated: {new Date().toLocaleDateString('en-IN')}</p>
                    <p>Data source: Government Agricultural Market Prices</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPrices;