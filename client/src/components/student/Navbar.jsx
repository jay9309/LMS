import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { backendUrl, isEducator, setIsEducator, getToken } = useContext(AppContext);
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const becomeEducator = async () => {
    try {
      if (isEducator) {
        navigate("/educator");
        return;
      }
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}api/educator/update-role`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        toast.success(data.message);
        setIsEducator(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    // If we're already on home, scroll directly
    if (location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // Otherwise navigate to home and pass the target ID in state
      navigate("/", { state: { scrollTo: id } });
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-10 lg:px-24 py-2 md:py-3 border-b border-gray-300 backdrop-blur-md bg-gray-900/70 text-white shadow-md transition-all duration-300">
      {/* Logo */}
      <div onClick={() => navigate("/")} className="flex items-center gap-3 cursor-pointer select-none">
        <div className="w-28 h-14 md:w-32 md:h-16 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center shadow-[0_4px_15px_rgba(250,204,21,0.4)] hover:shadow-[0_0_25px_rgba(250,204,21,0.7)] hover:scale-105 transition-all duration-300">
          <img src={assets.logo} alt="Aparaitech Logo" className="w-18 h-14 md:w-21 md:h-15 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.4)]" />
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        <button onClick={() => handleNavClick("home")} className="hover:text-yellow-400 transition-colors font-medium text-sm md:text-base">Home</button>
        <button onClick={() => handleNavClick("testimonials")} className="hover:text-yellow-400 transition-colors font-medium text-sm md:text-base">About Us</button>
        <button onClick={() => handleNavClick("cta")} className="hover:text-yellow-400 transition-colors font-medium text-sm md:text-base">Contact Us</button>

        {user && (
          <>
            <span className="text-gray-400">|</span>
            <button onClick={becomeEducator} className="hover:text-yellow-400 transition-colors font-medium text-sm md:text-base">
              {isEducator ? "Educator Dashboard" : "Become Educator"}
            </button>
            <span className="text-gray-400">|</span>
            <Link to="/my-enrollments" className="hover:text-yellow-400 transition-colors font-medium text-sm md:text-base">My Enrollments</Link>
          </>
        )}

        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()} className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold px-4 md:px-5 py-1.5 md:py-2 rounded-full shadow-md text-sm md:text-base transition-all duration-200">
            Create Account
          </button>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <button className="focus:outline-none" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <div className="w-6 h-0.5 bg-white mb-1 rounded"></div>
          <div className="w-6 h-0.5 bg-white mb-1 rounded"></div>
          <div className="w-6 h-0.5 bg-white rounded"></div>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-900/95 text-white flex flex-col items-center py-4 md:hidden shadow-lg border-t border-gray-700">
          <button onClick={() => handleNavClick("home")} className="py-2 text-base hover:text-yellow-400">Home</button>
          <button onClick={() => handleNavClick("testimonials")} className="py-2 text-base hover:text-yellow-400">About Us</button>
          <button onClick={() => handleNavClick("cta")} className="py-2 text-base hover:text-yellow-400">Contact Us</button>

          {user && (
            <>
              <button onClick={() => { becomeEducator(); setMobileMenuOpen(false); }} className="py-2 text-base hover:text-yellow-400">
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>
              <Link onClick={() => setMobileMenuOpen(false)} to="/my-enrollments" className="py-2 text-base hover:text-yellow-400">My Enrollments</Link>
            </>
          )}

          {!user ? (
            <button onClick={() => { openSignIn(); setMobileMenuOpen(false); }} className="mt-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold px-6 py-2 rounded-full shadow-md text-base transition-all duration-200">Create Account</button>
          ) : (
            <div className="mt-2"><UserButton /></div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
