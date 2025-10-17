import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext);

  const rating = calculateRating(course);
  const discountedPrice = (course.coursePrice - (course.discount * course.coursePrice) / 100).toFixed(2);

  return (
    <Link
      onClick={() => scrollTo(0, 0)}
      to={'/course/' + course._id}
      className="group relative border border-gray-300 rounded-2xl overflow-hidden shadow-md
                 hover:shadow-xl transition-shadow duration-300 bg-white flex flex-col"
    >
      {/* Horizontal Thumbnail */}
      <div className="relative w-full overflow-hidden">
        <img
          src={course.courseThumbnail}
          alt={course.courseTitle}
          className="w-full h-auto max-h-48 md:max-h-60 object-contain group-hover:scale-105 transition-transform duration-500"
        />
        {/* Optional hover overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{course.courseTitle}</h3>
        <p className="text-gray-500 text-sm mt-1">{course.educator.name}</p>

        {/* Rating */}
        <div className="flex items-center mt-2 space-x-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={i < Math.floor(rating) ? assets.star : assets.star_blank}
                alt=""
                className="w-4 h-4"
              />
            ))}
          </div>
          <p className="text-gray-500 text-sm">({course.courseRatings.length})</p>
          <p className="text-yellow-400 font-medium ml-2">{rating.toFixed(1)}</p>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-center justify-between">
          <p className="text-gray-900 font-semibold text-lg">
            {currency}{discountedPrice}
          </p>
          {course.discount > 0 && (
            <span className="text-sm text-red-500 font-medium bg-red-100 px-2 py-1 rounded-full">
              {course.discount}% OFF
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
