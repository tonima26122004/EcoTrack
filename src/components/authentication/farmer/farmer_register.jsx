import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase";

const Fregister = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      navigate("/farmer");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/farmer");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="h-full w-full flex flex-wrap lg:flex-nowrap absolute bg-gradient-to-t from-transparent to-[#C0F2CB] p-6">
      <div className="w-full lg:w-1/3 flex flex-col">
        <img src="logo.svg" alt="Logo" className="m-4 w-32 sm:w-40 md:w-32" />

        <div className="flex items-center w-full">
          <div className="bg-transparent border p-6 rounded-xl shadow-lg w-full max-w-2xl">
            <h2 className="text-2xl font-semibold text-gray-800">Get Started</h2>
            <p className="text-gray-500 mb-4">Create your account now</p>
            {error && <p className="text-red-500 text-center">{error}</p>}

            <form onSubmit={handleSignUp}>
              <label className="block text-gray-700 font-medium">Full Name:</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#082B13]"
                required
              />

              <label className="block mt-1 text-gray-700 font-medium">E-mail:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#082B13]"
                placeholder="email@gmail.com"
                required
              />

              <label className="block mt-1 text-gray-700 font-medium">Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#082B13]"
                required
              />

              <label className="block mt-1 text-gray-700 font-medium">Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#082B13]"
                required
              />

              <button
                type="submit"
                className="w-full bg-[#082B13] text-white mt-6 py-3 rounded-full hover:bg-[#06421A]"
              >
                Sign up →
              </button>
            </form>

            <p className="text-center mt-3 text-gray-600">
              Already have an account? <a href="/flogin" className="text-[#082B13] font-semibold">Log In</a>
            </p>

            <div className="mt-1 flex flex-col items-center">
              <span className="text-gray-500">or</span>
              <button onClick={handleGoogleSignUp} className="mt-2 flex items-center gap-2 border px-5 py-3 rounded-full text-gray-700 shadow-md">
                <img src="google.svg" alt="Google" className="w-5 h-5" />
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
