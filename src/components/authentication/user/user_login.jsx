import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; // Import Firebase auth

const Ulogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [error, setError] = useState(""); // State to store error messages
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleLogin = async () => {
    setError(""); // Clear previous errors

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate("/Chat"); // Redirect to Chat page after successful login
    } catch (error) {
      setError("Invalid email or password. Please try again."); // Display error message
    }
  };

  return (
    <div className="h-full w-full flex flex-wrap lg:flex-nowrap absolute bg-gradient-to-t from-transparent to-[#C0F2CB] p-6 min-h-screen">
      {/* Left Section */}
      <div className="w-full lg:w-1/3 flex flex-col">
        <img src="logo.svg" alt="Logo" className="m-4 w-32 sm:w-40 md:w-32" />

        <div className="flex flex-grow justify-center items-center w-full">
          <div className="bg-transparent border p-6 rounded-xl shadow-lg w-full max-w-2xl">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">Welcome Back</h2>
            <p className="text-gray-500 mb-4 text-center">Sign in to your account now</p>

            {error && <p className="text-red-500 text-center">{error}</p>} {/* Error Message */}

            {/* Email */}
            <label className="block text-gray-700 font-medium">E-mail:</label>
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
            <span className="text-xs text-red-500">Make a strong one</span>

            {/* Remember Me */}
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 accent-[#082B13]"
              />
              <label className="ml-2 text-gray-700 font-medium">Remember Me</label>
            </div>

            {/* Log In Button */}
<<<<<<< HEAD

            <a href="/Chat">
              <button className="w-full cursor-pointer bg-[#082B13] text-white mt-6 py-3 rounded-full flex justify-center items-center gap-2 hover:bg-[#082B13]">
                Log in →
              </button>
            </a>
=======
=======
>>>>>>> 5178fbde4b014cf47af85c94235e84944b48a163
            <button
              onClick={handleLogin}
              className="w-full bg-[#082B13] text-white mt-6 py-3 rounded-full flex justify-center items-center gap-2 hover:bg-[#082B13]"
            >
              Log in →
            </button>
<<<<<<< HEAD

=======
>>>>>>> 5178fbde4b014cf47af85c94235e84944b48a163

            {/* Sign Up Option */}
            <p className="text-center mt-3 text-gray-600">
              Don't have an account?{" "}
              <a href="/uregister" className="text-[#082B13] font-semibold">
                Sign Up
              </a>
            </p>

            {/* Google Sign-in */}
            <div className="mt-4 flex flex-col items-center">
              <span className="text-gray-500">or</span>
              <button className="mt-2 flex items-center gap-2 border px-5 py-3 rounded-full text-gray-700 shadow-md">
                <img src="google.svg" alt="Google" className="w-5 h-5" />
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-2/3 flex items-center justify-center mt-10 lg:mt-0">
        <div className="text-center">
          <img
            src="medicine.svg"
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

export default Ulogin;
