import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../Nav';

const Ecotalk_identification = () => {
    const navigate = useNavigate();
    const [isQuerySubmitted, setIsQuerySubmitted] = useState(false);
    const [que, setQue] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);
    const [displayImage, setDisplayImage] = useState(null);
    const [isDisplayVisible, setIsDisplayVisible] = useState(false);

    const getans = () => {
        console.log("Fetching answer for:", que);
        setIsQuerySubmitted(true);
        setIsDisplayVisible(true); // Show display box
        setDisplayImage(uploadedImage); // Move uploaded image to display box
        setUploadedImage(null); // Clear input box
    };

    return (
        <div className='bg-[#C0F2CB] min-h-screen font-lato px-4'>
            <Nav />

            <div className='bg-[#F1FCF3] rounded-2xl min-h-[85vh] w-[97%] mx-auto flex flex-col items-center justify-center relative p-4'>
                
                {/* Main Content (Hidden after clicking "Send") */}
                {!isDisplayVisible && (
                    <div className='flex flex-col items-center text-center w-full max-w-4xl main_content'>
                        <div className='flex flex-col items-center gap-2'>
                            <h1 className='text-lg text-[#575B58] font-lato'>Welcome to EcoTalk</h1>
                            <h1 className='text-2xl sm:text-5xl font-semibold font-lato'>
                                What Eco-Friendly Solution <br />
                                Do You Need?
                            </h1>
                            <h1 className='text-sm sm:text-lg px-3 mt-2 text-[#575B58] font-lato'>
                                Choose a category to access in-depth analysis, gain valuable insights, 
                                and discover innovative solutions that promote sustainability, 
                                enhance environmental awareness, and support informed decision-making 
                                for a greener and healthier future.
                            </h1>
                        </div>
                    </div>
                )}

                {/* Display Box (Visible after clicking "Send") */}
                {isDisplayVisible && (
                    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl font-semibold">Your Uploaded Image</h2>
                        {displayImage && <img src={displayImage} alt="Uploaded" className="mt-4 max-w-full h-auto rounded-md" />}
                    </div>
                )}

                {/* Input Box */}
                {!isDisplayVisible && (
                    <div className="w-full max-w-[95%] absolute bottom-4 mt-6">
                        <div className="w-full px-2 sm:px-4">
                            {/* Uploaded Image Preview (Before Sending) */}
                            {uploadedImage && (
                                <div className="w-1/3 border-2 border-[#082B13] bg-[#F1FCF3] rounded-md flex justify-center items-center max-h-[250px] overflow-hidden mb-4">
                                    <img src={uploadedImage} alt="Uploaded Preview" className="rounded-md max-h-full max-w-full object-contain" />
                                </div>
                            )}

                            <div className="relative w-full p-0 mt-0" onDrop={(e) => {
                                e.preventDefault();
                                const file = e.dataTransfer.files[0];
                                if (file) {
                                    const imageURL = URL.createObjectURL(file);
                                    setUploadedImage(imageURL);
                                }
                            }} onDragOver={(e) => e.preventDefault()}>

                                {/* Input Field */}
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        value={uploadedImage ? "Image Uploaded" : ""}
                                        placeholder="Upload your image here"
                                        className="px-4 py-2 border-2 font-libra outline-0 border-[#082B13] rounded-md w-full pr-[110px] sm:pr-[150px] md:pr-[180px] text-sm sm:text-base"
                                        disabled
                                    />

                                    {/* Buttons Container */}
                                    <div className="absolute inset-y-0 right-0 flex items-center gap-2 sm:gap-4">
                                        {/* Upload Button */}
                                        <input type="file" onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const imageURL = URL.createObjectURL(file);
                                                setUploadedImage(imageURL);
                                            }
                                        }} className="hidden" id="image-upload" />
                                        <label htmlFor="image-upload" className="py-1 rounded-md cursor-pointer">
                                            <img className="w-5 sm:w-6" src="upload.svg" alt="Upload" />
                                        </label>

                                        {/* Capture Button */}
                                        <button onClick={async () => {
                                            try {
                                                await navigator.mediaDevices.getUserMedia({ video: true });
                                                console.log("Camera opened for capturing image.");
                                            } catch (error) {
                                                console.error("Error accessing camera:", error);
                                            }
                                        }} className="py-1">
                                            <img className="w-5 sm:w-6" src="capture.svg" alt="Capture" />
                                        </button>

                                        {/* Send Button */}
                                        <button onClick={getans} className="py-2 sm:py-3 bg-[#082B13] rounded-md px-4 sm:px-4">
                                            <img className="w-5 sm:w-6" src="send.svg" alt="Send" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Ecotalk_identification;
