import React, { useState, useRef } from 'react';
import Nav from '../../Nav';
import LocationInputBox from './Location_input'; 
import AnimatedInputBox from './Input'; 
import axios from 'axios';

const DiseaseDisplay = ({ uploadedImage }) => {
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const handleImageUpload = async () => {
        if (!uploadedImage) return;

        setLoading(true);
        setError('');
        setPrediction(null);

        const formData = new FormData();
        formData.append('file', uploadedImage);

        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data.error) {
                setError(response.data.error);
            } else {
                setPrediction(response.data);
            }
        } catch (err) {
            setError('Failed to process image. Please try again.');
            console.error('Error:', err);
        } finally {
            setLoading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <div className='w-full max-w-md mx-auto p-4'>
            {error && (
                <div className='w-full p-2 bg-red-100 border border-red-400 text-red-700 rounded'>
                    {error}
                </div>
            )}

            {prediction && (
                <div className='w-full p-4 border border-[#082B13] rounded-md bg-[#F1FCF3]'>
                    <h2 className='text-lg font-bold text-[#082B13] mb-2'>Results</h2>
                    <div className='grid grid-cols-2 gap-2'>
                        <p className='font-semibold'>Disease Class:</p>
                        <p>{prediction.predicted_class}</p>
                        <p className='font-semibold'>Confidence:</p>
                        <p>{(prediction.confidence * 100).toFixed(2)}%</p>
                    </div>
                </div>
            )}
        </div>
    );
};

const Ecotalk_Diesease = () => {
    const [isQuerySubmitted, setIsQuerySubmitted] = useState(false);
    const [que, setQue] = useState('');
    const [isImageUploaded, setIsImageUploaded] = useState(false); 
    const [uploadedImage, setUploadedImage] = useState(null);
    const [isInputMoved, setIsInputMoved] = useState(false); // Added missing state

    const getans = () => {
        console.log('Fetching answer for:', que);
        setIsQuerySubmitted(true);
    };

    return (
        <div className='bg-[#C0F2CB] min-h-screen font-lato px-4'>
            <Nav />
            <div className='bg-[#F1FCF3] rounded-2xl min-h-[85vh] w-[97%] mx-auto flex flex-col items-center justify-center relative p-4'>
                {isQuerySubmitted ? (
                    <DiseaseDisplay uploadedImage={uploadedImage} />
                ) : (
                    <div className='flex flex-col items-center text-center w-full max-w-4xl main_content'>
                        <h1 className='text-lg text-[#575B58] font-lato'>Welcome to EcoTalk</h1>
                        <h1 className='text-2xl sm:text-5xl font-semibold font-lato'>
                            What Eco-Friendly Solution <br /> Do You Need?
                        </h1>
                        <h1 className='text-sm sm:text-lg px-3 mt-2 text-[#575B58] font-lato'>
                            Choose a category to access in-depth analysis, gain valuable insights, 
                            and discover innovative solutions that promote sustainability, 
                            enhance environmental awareness, and support informed decision-making 
                            for a greener and healthier future.
                        </h1>
                    </div>
                )}

                <div className='w-full max-w-[95%] absolute bottom-4 mt-6'>
                    <AnimatedInputBox 
                        getans={getans} 
                        setque={setQue} 
                        que={que} 
                        setIsQuerySubmitted={setIsQuerySubmitted} 
                        setIsImageUploaded={setIsImageUploaded}
                        setUploadedImage={setUploadedImage} 
                        setIsInputMoved={setIsInputMoved} // Ensuring prop is passed
                    />
                </div>
            </div>
        </div>
    );
};

export default Ecotalk_Diesease;
