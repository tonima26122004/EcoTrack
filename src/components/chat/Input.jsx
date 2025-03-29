import React, { useState } from 'react';

const AnimatedInputBox = ({ addQuery, getans, setque, que, setIsQuerySubmitted, setIsInputMoved }) => {
    const [image, setImage] = useState(null);

    // Handle image upload from file input
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            console.log("Image uploaded:", file.name);
        }
    };

    // Handle image capture from camera
    const handleCapture = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            console.log("Camera opened for capturing image.");
        } catch (error) {
            console.error("Error accessing camera:", error);
        }
    };

    // Handle send button click
    const handleSend = () => {
        console.log("Send button clicked.");
        getans();
        setIsQuerySubmitted(true);
        setIsInputMoved(true);
    };

    return (
        <div className="w-full px-2 sm:px-4">
            <div className="relative w-full">
                {/* Input Field */}
                <input
                    type="text"
                    value={que}
                    onChange={(e) => setque(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Enter Your Query here"
                    className="px-4 py-2 border-2 font-libra outline-0 border-[#082B13] rounded-md w-full pr-[110px] sm:pr-[150px] md:pr-[180px] text-sm sm:text-base"
                />

                {/* Buttons Container */}
                <div className="absolute inset-y-0 right-0 flex items-center gap-2 sm:gap-4  ">
                    {/* Upload Button */}
                    <input type="file" onChange={handleImageUpload} className="hidden" id="image-upload" />
                    <label htmlFor="image-upload" className="py-1 rounded-md cursor-pointer">
                        <img className="w-5 sm:w-6" src="upload.svg" alt="Upload" />
                    </label>

                    {/* Capture Button */}
                    <button onClick={handleCapture} className="py-1">
                        <img className="w-5 sm:w-6" src="capture.svg" alt="Capture" />
                    </button>

                    {/* Send Button */}
                    <button onClick={handleSend} className="py-2 sm:py-3 bg-[#082B13] rounded-md px-4 min-h-full  sm:px-6 ">
                        <img className="w-5 sm:w-6" src="send.svg" alt="Send" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AnimatedInputBox;
