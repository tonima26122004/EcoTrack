import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Nav from '../../Nav';
import Display from './display';

const Forum = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className='bg-[#C0F2CB] min-h-screen font-lato px-4'>
      <Nav />
        <Display />
     
    </div>
  );
};

export default Forum;
