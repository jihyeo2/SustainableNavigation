"use client";

import React, { useState } from 'react';
import Login from './login';
import SignUp from './signup'

export default function Page() {
  
    const [showLogin, setShowLogin] = useState(true);
  
    const toggleForm = () => {
      setShowLogin(!showLogin);
    };
  
    return (
        <div>
        <div className="font-nunito relative h-screen">
          <img
            src="https://images.pixexid.com/autumn-trees-on-a-road-lt5uanoi.jpeg" // Use the provided image URL
            alt="Road"
            className="w-full h-full object-cover"
          />
          {/* Navigation bar overlayed over the image */}
          <nav className="absolute top-0 left-0 right-0 bg-black bg-opacity-30 p-4 text-white flex justify-between">
            <h1 className="text-2xl font-semibold font-nunito">Sustainable Navigation</h1>
          </nav>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full">
            <h1 className="text-4xl font-semibold text-white mb-4"> {showLogin ? "Log In" : "Sign Up"}</h1>
            {showLogin ? <Login /> : <SignUp />}
            {showLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={toggleForm} className="text-blue-500 underline mt-4">
                {showLogin ? "Sign Up!" : "Log In!"}
            </button>
          </div>
        </div>
      </div>
    );
  }