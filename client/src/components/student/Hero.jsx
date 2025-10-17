
import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import SearchBar from "../../components/student/SearchBar";

const Hero = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div
      className="relative flex flex-col md:flex-row items-center justify-between w-full min-h-[85vh] px-4 md:px-20 text-left bg-cover bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: "url('/ak.png')",
        backgroundPosition: "center top",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40 before:absolute before:inset-0 before:bg-yellow-400/10 before:blur-[80px] before:opacity-70"></div>

      {/* Left Text Content */}
      <div
        className={`relative z-10 max-w-2xl transition-all duration-1000 pt-32 md:pt-0 ${
          animate ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
        }`}
      >
        <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-6xl leading-snug md:leading-tight drop-shadow-[0_2px_4px_rgba(250,204,21,0.6)]">
          “Grow Today. Lead Tomorrow.”
          <span className="text-yellow-400 block mt-2">
            Start learning the skills that matter
          </span>
        </h1>
        <p className="text-gray-200 mt-4 text-sm sm:text-base md:text-lg">
          We bring together world-class instructors, interactive content, and a
          supportive community to help you achieve your goals.
        </p>
      </div>

      {/* Right-side Floating Image */}
      <div
        className={`absolute bottom-[-40px] right-0 z-10 w-full md:w-auto flex justify-end transition-transform duration-1000 ease-in-out ${
          animate ? "translate-y-0" : "translate-y-[60px]"
        }`}
      >
        <img
          src="/pc.png"
          alt="Learning Illustration"
          className="w-[280px] sm:w-[370px] md:w-[580px] lg:w-[680px] object-contain drop-shadow-[0_0_40px_rgba(250,204,21,0.6)] animate-float"
          style={{ pointerEvents: "none" }}
        />
      </div>

      {/* Search bar */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-20 px-4">
        <SearchBar />
      </div>

      {/* Floating animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 3.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;
