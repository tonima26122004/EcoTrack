import React from 'react'

function log() {
  return (
    <div className='flex '>
      <div className='ml-20'>
        <img
          src="farmer.svg" 
          alt="Logo"
          className='ml-60'
        />
        <div className='flex ml-36 text-2xl text-center mt-2 font-semibold'>I'm here to cultivate growth <br/> as a FarmMaster.</div>
        <div className='ml-36 text-center text-lg'>Guide farming for smooth growth.</div>
        <button className='bg-[#082B13] text-white p-3 w-32 rounded-lg ml-52 mt-4 text-xl'>Login</button>
        <div className='ml-48 mt-4'>Don't have an account?</div>
        <button className='ml-60 text-xl text-[#2BA84A] underline'> Sign Up</button>
      </div>
      <div className='border border-gray-600 h-96 ml-72 '></div>
      <div className='ml-30'>
        <img
          src="medicine.svg" 
          alt="Logo"
          className='ml-60'
        />
        <div className='flex ml-36 text-2xl text-center mt-2 font-semibold'>I'm here to nurture nature <br/> as a LifeGrower.</div>
        <div className='ml-36 text-center text-lg'>Nurture plants for healthy growth.</div>
        <button className='bg-[#082B13] text-white p-3 w-32 rounded-lg ml-52 mt-4 text-xl'>Login</button>
        <div className='ml-48 mt-4'>Don't have an account?</div>
        <button className='ml-60 text-xl text-[#2BA84A] underline'> Sign Up</button>
      </div>
    </div>
  )
}

export default log
