import React, { useContext, useEffect, useState } from 'react'
import Footer from '../../components/student/Footer'
import { assets } from '../../assets/assets'
import CourseCard from '../../components/student/CourseCard'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom'
import SearchBar from '../../components/student/SearchBar'

const CoursesList = () => {

  const { input } = useParams()
  const { allCourses, navigate } = useContext(AppContext)
  const [filteredCourse, setFilteredCourse] = useState([])

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice()
      input
        ? setFilteredCourse(
          tempCourses.filter(item =>
            item.courseTitle.toLowerCase().includes(input.toLowerCase())
          )
        )
        : setFilteredCourse(tempCourses)
    }
  }, [allCourses, input])

  return (
    <>
      <div className="relative md:px-36 px-8 pt-28 text-left"> {/* moved down to avoid navbar overlap */}
        <div className='flex md:flex-row flex-col gap-6 items-start justify-between w-full'>
          <div>
            <h1 className='text-4xl font-semibold text-gray-800'>Course List</h1>
            <p className='text-gray-500'>
              <span onClick={() => navigate('/')} className='text-blue-600 cursor-pointer hover:underline'>Home</span> /
              <span> Course List</span>
            </p>
          </div>

          {/* Search bar slightly lower for navbar spacing */}
          <div className="mt-4 md:mt-0 w-full md:w-auto">
            <SearchBar data={input} />
          </div>
        </div>

        {/* Search tag display when searching */}
        {input && (
          <div className='inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-600'>
            <p>{input}</p>
            <img
              onClick={() => navigate('/course-list')}
              className='cursor-pointer'
              src={assets.cross_icon}
              alt="close"
            />
          </div>
        )}

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-6 px-2 md:p-0">
          {filteredCourse.map((course, index) => (
            <div
              key={index}
              className="transform transition-all duration-300 hover:-translate-y-2 hover:bg-yellow-100 rounded-xl shadow hover:shadow-xl p-2"
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  )
}

export default CoursesList
