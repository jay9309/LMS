import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import CourseCard from './CourseCard';
import { Link } from 'react-router-dom';

const CoursesSection = () => {
  const { allCourses } = useContext(AppContext);

  return (
    <div className="py-16 md:px-40 px-8">
      <h2 className="text-3xl font-medium text-gray-800">Learn from the best</h2>
      <p className="md:text-base text-sm text-gray-500 mt-3">
        Discover our top-rated courses across various categories. From coding and design to business and wellness, our courses are crafted to deliver results.
      </p>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 md:px-0 md:my-16 my-10 gap-6">
        {allCourses.slice(0, 4).map((course, index) => (
          <div
            key={index}
            className="transform transition-all duration-300 hover:-translate-y-3 hover:bg-yellow-100 rounded-lg shadow-md"
          >
            <CourseCard course={course} />
          </div>
        ))}
      </div>

      {/* Show All Courses Button */}
      <Link
        to={'/course-list'}
        onClick={() => scrollTo(0, 0)}
        className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold px-10 py-3 rounded-full shadow-md transition-all duration-200 inline-block"
      >
        Show all projects
      </Link>
    </div>
  );
};

export default CoursesSection;
