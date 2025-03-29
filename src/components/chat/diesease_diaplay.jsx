import React from 'react';

const Diesease_diaplay = ({ uploadedImage }) => {
  return (
    <div className='w-[95%] h-[450px] flex flex-col relative p-4'>
      {uploadedImage ? (
        <>
          {/* Image in Top-Right Corner */}
          <div className="absolute top-4 right-4 max-w-[200px] max-h-[200px]">
            <img 
              src={uploadedImage} 
              alt="Uploaded Preview" 
              className='rounded-md object-contain w-full h-full'
            />
          </div>

          {/* Text Starting from Extreme Left */}
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
    </div>
  );
};

export default Diesease_diaplay;
