import React from 'react';
import { FaWhatsapp, FaInstagram, FaYoutube } from 'react-icons/fa';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <footer className="flex md:flex-row flex-col-reverse items-center justify-between w-full px-8 py-6 border-t border-gray-400 backdrop-blur-md bg-[rgba(192,192,192,0.25)] shadow-md text-gray-800">
      
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <img className="hidden md:block w-20 brightness-125" src={assets.logo} alt="logo" />
        <div className="hidden md:block h-7 w-px bg-gray-500/60"></div>
        <p className="text-center text-xs md:text-sm text-gray-700">
          Copyright 2025 © <span className="text-yellow-400 font-semibold">Aparaitech</span>. All Rights Reserved.
        </p>
      </div>

      {/* Right Section - Social Icons */}
      <div className="flex items-center gap-4 max-md:mt-4 text-2xl">
        {/* WhatsApp */}
        <a
          href="https://wa.me/+916364326342"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-500 transition-colors duration-200"
        >
          <FaWhatsapp />
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/aparaitech_global?igsh=MWxueWp2amt2c2Vwdg=="
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-500 transition-colors duration-200"
        >
          <FaInstagram />
        </a>

        {/* YouTube */}
        <a
          href="http://www.youtube.com/@Aparaitech"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500 transition-colors duration-200"
        >
          <FaYoutube />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
