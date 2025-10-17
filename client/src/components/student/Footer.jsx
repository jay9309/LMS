import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { assets } from "../../assets/assets";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = (id) => {
    // If already on home -> direct scroll
    if (location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // navigate to home with target state
      navigate("/", { state: { scrollTo: id } });
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white w-full mt-10 relative z-10">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 md:gap-24 px-6 sm:px-10 md:px-36 py-10 border-b border-white/20 rounded-t-[2rem] shadow-[0_-2px_15px_rgba(0,0,0,0.3)]">
        {/* Logo & Description */}
        <div className="flex flex-col md:items-start items-center w-full md:w-1/3">
          <h1 className="text-3xl font-bold text-yellow-400 cursor-pointer hover:scale-105 transition-transform duration-300">Aparaitech</h1>
          <p className="mt-5 text-center md:text-left text-sm text-white/70 leading-relaxed max-w-xs">Empowering learners worldwide with accessible, interactive, and innovative online education.</p>
        </div>

        {/* Company Links */}
        <div className="flex flex-col md:items-start items-center w-full md:w-1/3">
          <h2 className="font-semibold text-white mb-4 text-lg">Company</h2>
          <ul className="flex md:flex-col flex-wrap justify-center md:justify-start gap-3 md:gap-2 text-white/80 text-sm">
            <li><button onClick={() => scrollTo('home')} className="hover:text-yellow-400 hover:underline underline-offset-4 transition-all duration-300">Home</button></li>
            <li><button onClick={() => scrollTo('testimonials')} className="hover:text-yellow-400 hover:underline underline-offset-4 transition-all duration-300">About us</button></li>
            <li><button onClick={() => scrollTo('cta')} className="hover:text-yellow-400 hover:underline underline-offset-4 transition-all duration-300">Contact us</button></li>
            <li><a href="/privacy" className="hover:text-yellow-400 hover:underline underline-offset-4 transition-all duration-300">Privacy policy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/3">
          <h2 className="font-semibold text-white mb-4 text-lg">Subscribe to our newsletter</h2>
          <p className="text-sm text-white/70 text-center md:text-left">Get the latest updates, articles, and learning resources every week.</p>
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 w-full">
            <input className="border border-gray-500/30 bg-gray-800 text-gray-200 placeholder-gray-400 outline-none w-full sm:w-64 h-10 rounded-full px-4 text-sm focus:ring-2 focus:ring-yellow-400 transition-all duration-300" type="email" placeholder="Enter your email" />
            <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold rounded-full w-full sm:w-28 h-10 transition-all duration-300 shadow-md active:scale-95 hover:shadow-[0_0_12px_rgba(250,204,21,0.4)]">Subscribe</button>
          </div>
        </div>
      </div>

      <p className="py-4 text-center text-xs md:text-sm text-white/60 border-t border-white/10">© {new Date().getFullYear()} Aparaitech. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
