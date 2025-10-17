// Companies.jsx
import React from 'react';
import { assets } from '../../assets/assets';

const Companies = () => {
  const logos = [
    { src: assets.microsoft_logo, alt: 'Microsoft' },
    { src: assets.walmart_logo, alt: 'Walmart' },
    { src: assets.accenture_logo, alt: 'Accenture' },
    { src: assets.adobe_logo, alt: 'Adobe' },
    { src: assets.paypal_logo, alt: 'Paypal' },
  ];

  return (
    <div className="relative w-full -mt-10 py-16 px-0 overflow-hidden">
      {/* Full-width Gray Gradient Background */}
      <div
        className="absolute top-0 left-0 w-full h-full 
        bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 
        pointer-events-none"
      ></div>

      <div className="relative z-10 text-center px-6 md:px-20">
        <p className="text-lg md:text-xl text-white font-medium">
          Trusted by learners from
        </p>

        {/* ✅ Responsive Scrollable Logo Row */}
        <div
          className="mt-10 flex md:flex-wrap md:justify-center md:gap-12 
                     overflow-x-auto md:overflow-x-visible no-scrollbar
                     gap-6 scroll-smooth px-4"
        >
          {logos.map((logo, index) => (
            <div
              key={index}
              className="bg-gray-200/20 backdrop-blur-sm p-4 md:p-6 
                         flex-shrink-0 w-28 h-20 md:w-36 md:h-24 
                         flex items-center justify-center rounded-2xl 
                         transition-all duration-300 hover:scale-105 
                         hover:shadow-[0_8px_25px_rgba(0,0,0,0.2)]"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Companies;
