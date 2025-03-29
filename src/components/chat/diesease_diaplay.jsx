import React, { useState } from 'react';

const DiseaseDisplay = ({ addQuery, getans, setque, que, setIsQuerySubmitted, setIsInputMoved }) => {
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState('');
    const [isImageUploaded, setIsImageUploaded] = useState(false);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImage(imageURL);
            setImageName(file.name);
            setIsImageUploaded(true);
            console.log("Image uploaded:", file.name);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImage(imageURL);
            setImageName(file.name);
            setIsImageUploaded(true);
            console.log("Image dropped and uploaded:", file.name);
        }
    };

    const handleDragOver = (e) => e.preventDefault();

    const handleCapture = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            console.log("Camera opened for capturing image.");
        } catch (error) {
            console.error("Error accessing camera:", error);
        }
    };

    const handleSend = () => {
        console.log("Send button clicked.");
        setImage(null);
        setImageName('');
        getans();
        setIsQuerySubmitted(true);
        setIsInputMoved(true);
    };

    return (
        <div className='w-[95%] h-[450px] flex flex-col relative p-4'>
            {image ? (
                <>
                    <div className="absolute top-4 right-4 max-w-[200px] max-h-[200px]">
                        <img 
                            src={image} 
                            alt="Uploaded Preview" 
                            className='rounded-md object-contain w-full h-full' 
                        />
                    </div>

                    <div className='mt-auto w-full'>
                        <h1 className='text-xl font-bold text-[#082B13] mb-2'>
                            Plant Diagnosis Result
                        </h1>
                        <p className='text-sm text-[#575B58]'>
                            This is a detailed analysis based on the uploaded image.
                        </p>
                    </div>
                </>
            ) : (
                <p className='text-sm text-[#575B58]'>No image uploaded yet.</p>
            )}

            <div className="w-full px-2 sm:px-4 mt-4" onDrop={handleDrop} onDragOver={handleDragOver}>
                {image && (
                    <div className="w-1/3 border-2 border-[#082B13] bg-[#F1FCF3] rounded-md flex justify-center items-center max-h-[250px] overflow-hidden mb-4">
                        <img src={image} alt="Uploaded Preview" className="rounded-md max-h-full max-w-full object-contain" />
                    </div>
                )}

                <div className="relative w-full">
                    <input
                        type="text"
                        value={imageName}
                        placeholder="Upload your image here"
                        className="px-4 py-2 border-2 font-libra outline-0 border-[#082B13] rounded-md w-full pr-[110px] sm:pr-[150px] md:pr-[180px] text-sm sm:text-base"
                        disabled
                    />

                    <div className="absolute inset-y-0 right-0 flex items-center gap-2 sm:gap-4">
                        <input type="file" onChange={handleImageUpload} className="hidden" id="image-upload" />
                        <label htmlFor="image-upload" className="py-1 rounded-md cursor-pointer">
                            <img className="w-5 sm:w-6" src="upload.svg" alt="Upload" />
                        </label>

                        <button onClick={handleCapture} className="py-1">
                            <img className="w-5 sm:w-6" src="capture.svg" alt="Capture" />
                        </button>

                        <button onClick={handleSend} className="py-2 sm:py-3 bg-[#082B13] rounded-md px-4 sm:px-4">
                            <img className="w-5 sm:w-6" src="send.svg" alt="Send" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiseaseDisplay;