import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; // Import Firebase auth

const Uregister = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(""); // State to store error messages
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    setError(""); // Clear previous errors

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      navigate("/Chat"); // Redirect to Chat page after successful signup
    } catch (error) {
      setError(error.message); // Display Firebase error messages
    }
  };

  return (
    <div className="h-full w-full flex flex-wrap lg:flex-nowrap absolute bg-gradient-to-t from-transparent to-[#C0F2CB] p-6">
      {/* Left Section */}
      <div className="w-full lg:1/3 flex flex-col ">
        <img src="logo.svg" alt="Logo" className="m-4 w-32 sm:w-40 md:w-32" />

        <div className="flex items-center w-full">
          <div className="bg-transparent border p-6 rounded-xl shadow-lg w-full max-w-2xl">
            <h2 className="text-2xl font-semibold text-gray-800">Get Started</h2>
            <p className="text-gray-500 mb-4">Create your account now</p>

            {error && <p className="text-red-500 text-center">{error}</p>} {/* Error Message */}

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
            <label className="block mt-1 text-gray-700 font-medium">E-mail:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#082B13]"
              placeholder="email@gmail.com"
            />

            {/* Password */}
            <label className="block mt-1 text-gray-700 font-medium">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#082B13]"
            />
            <span className="text-xs text-red-500">Make a strong one</span>

            {/* Confirm Password */}
            <label className="block mt-1 text-gray-700 font-medium">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#082B13]"
            />

            {/* Sign Up Button */}


            <a href="/Chat">
              <button className="w-full bg-[#082B13] text-white mt-6 py-3 cursor-pointer rounded-full flex justify-center items-center gap-2 hover:bg-[#082B13]">
                Sign up →
              </button>
            </a>

            


            {/* Login Option */}
            <p className="text-center mt-3 text-gray-600">
              Already have an account?{" "}
              <a href="/ulogin" className="text-[#082B13] font-semibold">
                Log In
              </a>
            </p>

            {/* Google Sign-up */}
            <div className="mt-4 flex flex-col items-center">
              <span className="text-gray-500">or</span>
              <button className="mt-2 flex items-center gap-2 border px-5 py-3 rounded-full text-gray-700 shadow-md">
                <img src="google.svg" alt="Google" className="w-5 h-5" />
                Sign up with Google
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full flex items-center lg:ml-30 mt-10 lg:mt-0">
        <div className="text-center">
          <img
            src="farmer.svg"
            alt="Farmer Illustration"
            className="w-72 sm:w-80 md:w-96 lg:w-auto mx-auto"
          />
          <div className="text-2xl sm:text-3xl font-semibold mt-4">
            Access Your Green Hub
          </div>
          <div className="text-lg text-gray-700 mt-2">
            Sign in to explore smart farming insights, plant care tips, and <br />
            eco-friendly solutions—all in one place.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Uregister;
