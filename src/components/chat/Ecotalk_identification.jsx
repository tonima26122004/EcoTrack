import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../Nav';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const Ecotalk_identification = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      setError(null);
      setPrediction(null);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setError(null);
      setPrediction(null);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError('Please select an image file');
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Prediction failed');
      }

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      setError(err.message || 'Failed to process image');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setPrediction(null);
    setError(null);
  };

  return (
    <div className='bg-[#C0F2CB] min-h-screen font-lato px-4'>
      <Nav />

      <div className='bg-[#F1FCF3] rounded-2xl min-h-[85vh] w-[97%] mx-auto flex flex-col items-center justify-center relative p-4'>
        <motion.div 
          className='text-center w-full max-w-2xl'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className='text-lg text-[#575B58] font-lato'>Welcome to EcoTalk</h1>
          <motion.h1 
            className='text-2xl sm:text-5xl font-semibold font-lato mb-4'
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            Plant Disease Identification
          </motion.h1>
          <p className='text-sm sm:text-lg px-3 mt-2 text-[#575B58] font-lato mb-8'>
            Upload an image of a medicinal plant to identify its species and check for diseases.
          </p>

          <AnimatePresence>
            {!prediction ? (
              <motion.div
                key="upload-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='mb-6'
              >
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
                    isDragging ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-400'
                  }`}
                  onClick={triggerFileInput}
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className='hidden'
                  />
                  <div className='flex flex-col items-center justify-center space-y-4'>
                    <FiUpload className={`w-12 h-12 ${
                      isDragging ? 'text-green-500' : 'text-gray-400'
                    }`} />
                    <p className='text-gray-600'>
                      {isDragging ? 'Drop the image here' : 'Drag & drop an image or click to browse'}
                    </p>
                    {selectedFile && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='mt-4 flex items-center bg-green-100 rounded-full px-4 py-2'
                      >
                        <FiCheckCircle className='text-green-500 mr-2' />
                        <span className='text-sm font-medium text-green-800'>
                          {selectedFile.name.length > 20 
                            ? `${selectedFile.name.substring(0, 15)}...${selectedFile.name.split('.').pop()}`
                            : selectedFile.name}
                        </span>
                      </motion.div>
                    )}
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className='mt-4 flex items-center bg-red-100 rounded-lg p-3'
                  >
                    <FiXCircle className='text-red-500 mr-2' />
                    <span className='text-red-700'>{error}</span>
                  </motion.div>
                )}

                <motion.button
                  onClick={handleSubmit}
                  disabled={isLoading || !selectedFile}
                  whileHover={!isLoading && selectedFile ? { scale: 1.02 } : {}}
                  whileTap={!isLoading && selectedFile ? { scale: 0.98 } : {}}
                  className={`mt-6 px-8 py-3 rounded-full text-white text-lg font-medium shadow-lg ${
                    isLoading || !selectedFile 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-xl'
                  } transition-all duration-300`}
                >
                  {isLoading ? (
                    <span className='flex items-center justify-center'>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        className='inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2'
                      />
                      Analyzing...
                    </span>
                  ) : (
                    'Identify Plant'
                  )}
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="results-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className='bg-white rounded-xl shadow-xl overflow-hidden'
              >
                <div className='p-6'>
                  <div className='flex justify-between items-start'>
                    <h2 className='text-2xl font-bold text-gray-800 mb-4'>Identification Results</h2>
                    <button 
                      onClick={resetForm}
                      className='text-gray-500 hover:text-gray-700'
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className='flex flex-col md:flex-row gap-6'>
                    <motion.div 
                      className='flex-1'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className='relative rounded-lg overflow-hidden border-4 border-white shadow-md'>
                        <img 
                          src={`http://localhost:5000${prediction.image_url}`} 
                          alt="Processed plant" 
                          className='w-full h-auto object-cover'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4'>
                          <span className='text-white font-semibold text-lg'>
                            {prediction.plant_name}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className='flex-1 flex flex-col justify-center'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className='space-y-4'>
                        <div>
                          <h3 className='text-sm font-medium text-gray-500'>Plant Name</h3>
                          <p className='text-xl font-bold text-gray-800'>{prediction.plant_name}</p>
                        </div>
                        
                        <div>
                          <h3 className='text-sm font-medium text-gray-500'>Confidence Level</h3>
                          <div className='mt-1'>
                            <div className='w-full bg-gray-200 rounded-full h-4'>
                              <motion.div 
                                className='h-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-600'
                                initial={{ width: 0 }}
                                animate={{ width: `${prediction.confidence * 100}%` }}
                                transition={{ duration: 1, type: 'spring' }}
                              />
                            </div>
                            <p className='text-right mt-1 text-sm font-medium text-gray-700'>
                              {(prediction.confidence * 100).toFixed(2)}%
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className='text-sm font-medium text-gray-500'>Health Status</h3>
                          <div className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mt-1'>
                            Healthy
                          </div>
                        </div>
                      </div>
                      
                      <motion.button
                        onClick={resetForm}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='mt-8 px-6 py-2 bg-white border border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition-colors'
                      >
                        Analyze Another Plant
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Ecotalk_identification;