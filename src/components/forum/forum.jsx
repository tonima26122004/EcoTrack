import React from 'react';
import Nav from '../../Nav';
import Display from '../../../src/components/forum/display'

const Forum = () => {
  return (
    <div className='bg-[#C0F2CB] min-h-screen font-lato px-4'>
      <Nav />
      <Display />
      
        
        {/* Main Content Section */}
        <div className='flex flex-col md:flex-row gap-6 mt-8'>
          
          {/* Community Posts Section */}
          

          {/* Sidebar Section */}
          <div className='w-full md:w-1/3 bg-white rounded-lg p-4 shadow-md'>
            <h2 className='text-xl font-semibold mb-4'>Community People</h2>
            <input type='text' placeholder='Search community...' className='border rounded-lg px-2 py-1 w-full mb-2'/>
            <div className='space-y-2'>
              <p className='font-semibold'>Emily Harvester</p>
              <p className='text-gray-600 text-sm'>234 posts</p>
            </div>
            <button className='mt-4 bg-green-600 text-white py-2 px-4 rounded-lg w-full'>Host Your Own Eco Workshop</button>
          </div>
        </div>

        {/* Add Your Opinion Section */}
        <div className='mt-6 bg-white rounded-lg p-4 shadow-md'>
          <h2 className='text-xl font-semibold mb-2'>Add your opinion:</h2>
          <textarea className='w-full border rounded-lg px-2 py-1' rows='3' placeholder='Share your thoughts...'></textarea>
          <button className='mt-2 bg-green-600 text-white py-2 px-4 rounded-lg'>Submit</button>
        </div>
      </div>
  );
};

export default Forum;