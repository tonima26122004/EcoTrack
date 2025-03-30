import React, { useState, useEffect } from 'react';
import Fnav from './fnav';

const Farmer = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  // Soil type mapping with additional data
  const soilData = {
    'Alluvial': {
      name: 'Alluvial Soil',
      description: 'Fertile soil deposited by rivers, rich in minerals',
      improvement: [
        'Add organic compost',
        'Practice crop rotation',
        'Use balanced NPK fertilizers',
        'Maintain proper irrigation'
      ],
      plants: {
        'India': ['Rice', 'Wheat', 'Sugarcane', 'Cotton', 'Jute', 'Tobacco'],
        'Global': ['Corn', 'Soybeans', 'Vegetables', 'Fruits', 'Barley', 'Oats']
      },
      color: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800'
    },
    'Black': {
      name: 'Black Soil',
      description: 'Clayey soil with high moisture retention',
      improvement: [
        'Add gypsum for better drainage',
        'Use green manure',
        'Apply lime to reduce acidity',
        'Practice deep ploughing'
      ],
      plants: {
        'India': ['Cotton', 'Sorghum', 'Wheat', 'Pulses', 'Millets', 'Soybean'],
        'Global': ['Cotton', 'Wheat', 'Citrus', 'Sunflower', 'Alfalfa', 'Olives']
      },
      color: 'bg-gray-50',
      border: 'border-gray-200',
      text: 'text-gray-800'
    },
    'Clay': {
      name: 'Clay Soil',
      description: 'Heavy soil with poor drainage but nutrient-rich',
      improvement: [
        'Add sand/organic matter',
        'Avoid compaction',
        'Create raised beds',
        'Use cover crops'
      ],
      plants: {
        'India': ['Potatoes', 'Cabbage', 'Peas', 'Fruit trees', 'Onions', 'Carrots'],
        'Global': ['Lettuce', 'Broccoli', 'Brussels sprouts', 'Deciduous trees', 'Peaches', 'Plums']
      },
      color: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-800'
    },
    'Red': {
      name: 'Red Soil',
      description: 'Porous soil with low fertility, rich in iron',
      improvement: [
        'Add organic matter',
        'Use nitrogen fertilizers',
        'Apply mulch',
        'Grow drought-resistant crops'
      ],
      plants: {
        'India': ['Millets', 'Groundnut', 'Tobacco', 'Oilseeds', 'Pulses', 'Maize'],
        'Global': ['Grapes', 'Olives', 'Figs', 'Certain cereals', 'Almonds', 'Pomegranates']
      },
      color: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800'
    }
  };

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    setError(null);
    
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          
          let locationName = '';
          if (data.address) {
            locationName = [
              data.address.village,
              data.address.city,
              data.address.state,
              data.address.country
            ].filter(Boolean).join(', ');
          }
          
          setLocation(locationName || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          setIsGettingLocation(false);
        } catch (err) {
          setError("Could not fetch location details");
          setIsGettingLocation(false);
        }
      },
      (error) => {
        setError("Unable to retrieve your location");
        setIsGettingLocation(false);
      }
    );
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        setError('Please upload an image file (JPEG, PNG)');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
      setPrediction(null);
      setError(null);
      setRecommendations(null);
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to classify soil');
      }

      if (typeof data.confidence !== 'number' || isNaN(data.confidence)) {
        throw new Error('Invalid prediction received from server');
      }

      setPrediction({
        class: data.class,
        confidence: data.confidence
      });
      
      setShowLocationInput(true);
    } catch (err) {
      console.error('Prediction error:', err);
      setError(err.message || 'Failed to classify soil image');
      setPrediction(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSubmit = () => {
    if (!location.trim()) {
      setError('Please enter a location');
      return;
    }

    if (!prediction?.class) {
      setError('Soil type not detected');
      return;
    }

    // Determine if the location is in India or global
    const isIndia = location.toLowerCase().includes('india') || 
                   /(delhi|mumbai|bangalore|chennai|kolkata|hyderabad|punjab|rajasthan|gujarat|maharashtra)/i.test(location);

    const region = isIndia ? 'India' : 'Global';
    const soilType = prediction.class;
    
    setRecommendations({
      ...soilData[soilType],
      region,
      location
    });
  };

  return (
    <div className="bg-[#C0F2CB] min-h-screen font-lato px-4">
      <Fnav />

      <div className="rounded-2xl min-h-[85vh] w-[97%] mx-auto flex flex-col bg-white relative p-6">
        <div className="text-center mb-8">
          <h1 className="text-lg text-[#575B58] font-lato">Welcome to EcoTalk</h1>
          <h1 className="text-2xl sm:text-4xl font-semibold font-lato">
            Soil Analysis System
          </h1>
          <p className="text-sm sm:text-lg px-3 mt-2 text-[#575B58] font-lato">
            Upload soil image and location to get detailed analysis and recommendations
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Image Upload and Analysis */}
          <div className="lg:w-1/2">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center h-full">
              {previewImage ? (
                <div className="mb-6">
                  <img 
                    src={previewImage} 
                    alt="Soil preview" 
                    className="mx-auto max-h-72 rounded-lg object-cover shadow-md"
                  />
                </div>
              ) : (
                <div className="py-12 flex flex-col items-center">
                  <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <p className="text-gray-500">No image selected</p>
                </div>
              )}
              
              <label className="cursor-pointer bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg inline-flex items-center shadow-md transition duration-200">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                Choose Soil Image
                <input 
                  type="file" 
                  accept="image/jpeg, image/png"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              {selectedImage && (
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`mt-6 w-full py-3 px-4 rounded-lg text-white font-medium shadow-md transition duration-200 ${
                    isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing Soil...
                    </span>
                  ) : 'Analyze Soil'}
                </button>
              )}

              {/* Location Input */}
              {showLocationInput && !recommendations && (
                <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 text-center">Enter Location</h3>
                  <div className="flex mb-4">
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g., Punjab, India"
                      className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      onClick={handleLocationSubmit}
                      className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-r-lg"
                    >
                      Submit
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="border-t border-gray-300 flex-grow mr-4"></div>
                    <span className="text-gray-500">or</span>
                    <div className="border-t border-gray-300 flex-grow ml-4"></div>
                  </div>
                  
                  <button
                    onClick={getCurrentLocation}
                    disabled={isGettingLocation}
                    className={`mt-4 w-full py-3 px-4 rounded-lg font-medium shadow-sm transition duration-200 flex items-center justify-center ${
                      isGettingLocation ? 'bg-gray-200 text-gray-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {isGettingLocation ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Detecting Location...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        Use Current Location
                      </>
                    )}
                  </button>
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    Location helps provide region-specific recommendations
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Results and Recommendations */}
          <div className="lg:w-1/2">
            {error && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            {/* Prediction Results */}
            {prediction && (
              <div className={`mb-6 p-6 rounded-xl border ${soilData[prediction.class]?.border} ${soilData[prediction.class]?.color} shadow-sm`}>
                <h3 className="text-2xl font-semibold mb-4 text-center">
                  <span className={soilData[prediction.class]?.text}>Soil Analysis Results</span>
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-600 mb-2">Soil Type</h4>
                    <p className="text-xl font-semibold">
                      {soilData[prediction.class]?.name || prediction.class}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-600 mb-2">Confidence</h4>
                    <p className="text-xl font-semibold">
                      {(prediction.confidence * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
                <div className="mt-4 bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-600 mb-2">Description</h4>
                  <p>{soilData[prediction.class]?.description}</p>
                </div>
              </div>
            )}

            {/* Recommendations */}
            {recommendations && (
              <div className="space-y-6">
                <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span>Location Analysis</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-medium text-gray-600 mb-1">Location</h4>
                      <p className="font-medium">{recommendations.location}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-medium text-gray-600 mb-1">Region</h4>
                      <p className="font-medium">{recommendations.region}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Recommended Plants for {recommendations.region}</span>
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {recommendations.plants[recommendations.region].map((plant, index) => (
                      <div key={index} className="bg-green-50 p-3 rounded-lg border border-green-100 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                        <span className="font-medium">{plant}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                    </svg>
                    <span>Soil Improvement Tips</span>
                  </h3>
                  <ul className="space-y-2">
                    {recommendations.improvement.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 mt-0.5 mr-2 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Farmer;