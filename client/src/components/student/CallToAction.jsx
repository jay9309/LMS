import React from "react";
import { assets } from "../../assets/assets";

const CallToAction = () => {
  return (
    <div className="flex justify-center items-center py-20 px-6 bg-gray-50">
      <div
        className="relative flex flex-col items-center text-center gap-5 py-16 px-10 w-full max-w-4xl
                   bg-gradient-to-tr from-yellow-300 via-yellow-400 to-yellow-200 
                   rounded-[3rem] shadow-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]"
      >
        {/* Decorative overlays */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] rounded-[3rem]"></div>
        <div className="absolute -top-12 -left-12 w-44 h-44 bg-yellow-500 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-12 -right-12 w-44 h-44 bg-yellow-300 rounded-full blur-3xl opacity-30"></div>

        {/* Main content */}
        <div className="relative z-10 max-w-2xl">
          <h1 className="md:text-5xl text-2xl font-extrabold text-gray-900 leading-snug drop-shadow-[0_3px_5px_rgba(0,0,0,0.3)]">
            Learn anything, anytime, anywhere
          </h1>

          <p className="text-gray-800 sm:text-base mt-3 leading-relaxed">
            Unlock your potential with flexible online learning designed for your personal and professional growth.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center font-medium gap-4 mt-8">
            <button
              className="bg-black text-yellow-400 font-semibold px-10 py-3 rounded-full shadow-lg hover:shadow-yellow-500/50 
                         hover:scale-105 transform transition-all duration-300"
            >
              Get Started
            </button>

            <button className="flex items-center gap-2 text-gray-800 hover:text-black transition-all duration-300">
              Learn More
              <img src={assets.arrow_icon} alt="arrow_icon" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
