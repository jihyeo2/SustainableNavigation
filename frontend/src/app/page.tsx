"use client";

// pages/index.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { CSSTransition } from 'react-transition-group';
import './css/fonts.css'        // Import External Fonts
import './css/animations.css';  // Import Animations CSS

function LoginBar() {
  return (
      <nav className="absolute top-0 left-0 right-0 bg-transparent p-4 text-white flex justify-between">
        <a href="./"><h1 className="text-2xl font-semibold font-nunito">Sustainable Navigation</h1></a>
        <div className="flex space-x-4"> {/* Add a flex container for navigation links */}
          <Link href="/login">
            <button className="font-nunito bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-300 rounded">
              Log In
            </button>
          </Link>
        </div>
      </nav>
  );
}

const Home: React.FC = () => {

  const [animationClass, setAnimationClass] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Add the animation class after a short delay to trigger the animation on page load
    const timeout = setTimeout(() => {
      setAnimationClass(true);
    }, 100); // Adjust the delay as needed

    // Clear the timeout to prevent setting the class if the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      {/* Image of a road */}
      <div className="relative h-screen w-screen">
        <img
          src="https://images.pixexid.com/autumn-trees-on-a-road-lt5uanoi.jpeg" // Use the provided image URL
          alt="A rural road passing underneath Autumn trees."
          className="w-full h-full object-cover"
        />
        <LoginBar />
        {/* Text in the middle of the page with animation and larger font size */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <CSSTransition
            in={animationClass}
            timeout={1000} // Animation duration in milliseconds
            classNames="rise-up-animation"
            unmountOnExit
          >
            <div>
              <h2 className="text-7xl font-semibold text-white font-nunito">Sustainable Navigation</h2>
              <div className="mt-4"> {/* Add margin-top to separate */}
                <h2 className="text-xl text-white font-nunito">Taking you where you need to go, and protecting the planet</h2>
              </div>
              <br></br>
              <button onClick={() => router.push("/login")} className="font-nunito bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-300 rounded">
                Start Searching
              </button>
            </div>
          </CSSTransition>
        </div>
      </div>
    </div>
  );
};

export default Home;
