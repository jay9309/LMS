import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { UserButton, useUser } from '@clerk/clerk-react';

const Navbar = ({ bgColor }) => {
  const { isEducator } = useContext(AppContext);
  const { user } = useUser();

  return (
    isEducator &&
    user && (
      <div
        className={`flex items-center justify-between px-4 md:px-8 border-b border-gray-400 py-3 backdrop-blur-md bg-[rgba(192,192,192,0.25)] shadow-md transition-all duration-300 ${bgColor}`}
      >
        {/* Logo */}
        <Link to="/">
          <img
            src={assets.logo}
            alt="Logo"
            className="w-28 lg:w-32 hover:opacity-80 transition-opacity duration-200"
          />
        </Link>

        {/* User Info */}
        <div className="flex items-center gap-5 text-gray-700 relative font-medium">
          <p className="hover:text-gray-900 transition-colors duration-200">
            Hi! {user.fullName}
          </p>
          <UserButton />
        </div>
      </div>
    )
  );
};

export default Navbar;
