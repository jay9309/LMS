import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ data }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState(data ? data : '');

  const onSearchHandler = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    navigate('/course-list/' + input.trim());
  };

  return (
    <form
      onSubmit={onSearchHandler}
      className="max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-300 rounded-full shadow-sm 
                 hover:shadow-md hover:scale-105 transform transition-all duration-300"
    >
      {/* Search Icon */}
      <img
        className="md:w-auto w-10 px-4"
        src={assets.search_icon}
        alt="search_icon"
      />

      {/* Input */}
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        type="text"
        className="w-full h-full outline-none text-gray-600 placeholder-gray-400 rounded-full px-2"
        placeholder="Search for courses"
      />

      {/* Search Button */}
      <button
        type="submit"
        className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold rounded-full md:px-8 px-5 md:py-3 py-2 mx-1 transition-all duration-200 shadow-md"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
