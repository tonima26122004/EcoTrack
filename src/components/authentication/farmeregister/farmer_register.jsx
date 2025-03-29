import React, { useState } from "react";

const Fregister = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-full w-full absolute bg-gradient-to-t from-transparent to-[#C0F2CB]">
      <div>
        <img src="logo.svg" alt="Logo" className="m-8" />

        <div className="flex  items-center m-8 ">
          <div className="bg-transparent border p-4 rounded-xl shadow-lg w-full min-w-2xl max-w-lg">
            <h2 className="text-2xl font-semibold text-gray-800">Get Started</h2>
            <p className="text-gray-500 mb-4">Create your account now</p>

            {/* Full Name */}
            <label className="block text-gray-700 font-medium">Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#082B13]"
            />

            {/* Email */}
            <label className="block mt-4 text-gray-700 font-medium">E-mail:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#082B13]"
              placeholder="email@gmail.com"
            />

            {/* Password */}
            <label className="block mt-4 text-gray-700 font-medium">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#082B13]"
            />
            <span className="text-xs text-red-500">make a strong one</span>

            {/* Confirm Password */}
            <label className="block mt-4 text-gray-700 font-medium">
              Confirm Password:
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#082B13]"
            />

            {/* Sign Up Button */}
            <button className="w-full bg-[#082B13] text-white mt-6 py-3 rounded-full flex justify-center items-center gap-2 hover:bg-[#082B13]">
              Sign up →
            </button>

            {/* Login Option */}
            <p className="text-center mt-3 text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-[#082B13] font-semibold">
                Log In
              </a>
            </p>

            {/* Google Sign-up */}
            <div className="mt-4 flex flex-col items-center">
              <span className="text-gray-500">or</span>
              <button className="mt-2 flex items-center gap-2 border px-5 py-3 rounded-full text-gray-700 shadow-md">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                  alt="Google"
                  className="w-5 h-5"
                />
                Sign up with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fregister;
