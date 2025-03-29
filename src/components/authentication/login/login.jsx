import React from 'react';
import Content from './content';
import Log from './log';
function Login() {
  return (
    <div className="h-full w-full absolute  bg-gradient-to-t from-transparent to-[#C0F2CB] ">
        <div>
      <img
        src="logo.svg" 
        alt="Logo"
        className='m-8'
      />
      </div>
      <Content />
      <Log />
    </div>
  );
}

export default Login;
