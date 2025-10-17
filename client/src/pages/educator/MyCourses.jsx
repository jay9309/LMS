import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../components/student/Loading";

const MyCourses = () => {
  const { backendUrl, isEducator, currency, getToken } = useContext(AppContext);
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducatorCourses = async () => {
      try {
        setLoading(true);
        const token = await getToken();
        const { data } = await axios.get(`${backendUrl}api/educator/courses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data.success) setCourses(data.courses);
        else toast.error(data.message);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (isEducator) fetchEducatorCourses();
  }, [isEducator, backendUrl, getToken]);

  // ✅ Loading skeleton
  if (loading) {
    return (
      <div className="p-8 grid gap-6 animate-pulse">
        <div className="h-6 bg-gray-800/70 rounded w-44"></div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-gray-800/60 rounded-lg"></div>
        ))}
      </div>
    );
  }

  // ✅ Main view
  return courses && courses.length > 0 ? (
    <div className="min-h-screen flex flex-col p-6 md:p-10 bg-gradient-to-b from-gray-50 to-gray-100">
      <h2 className="pb-6 text-2xl font-semibold text-gray-800 tracking-wide border-b border-gray-300">
        My Courses
      </h2>

      <div className="overflow-x-auto mt-6 rounded-xl shadow-lg bg-white border border-gray-200">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-900 text-white uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Course</th>
              <th className="px-6 py-4 text-center">Earnings</th>
              <th className="px-6 py-4 text-center">Students</th>
              <th className="px-6 py-4 text-center">Published</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {courses.map((course) => (
              <tr
                key={course._id}
                className="hover:bg-gray-50 transition-all duration-200 cursor-pointer hover:scale-[1.01]"
              >
                {/* Course Column */}
                <td className="px-6 py-4 flex items-center gap-3">
                  <img
                    src={course.courseThumbnail}
                    alt="Course"
                    className="w-16 h-12 object-cover rounded-lg border border-gray-300 shadow-sm"
                  />
                  <div>
                    <p className="font-medium text-gray-800 truncate max-w-[250px]">
                      {course.courseTitle}
                    </p>
                    <p className="text-xs text-gray-500 italic">
                      {course.discount
                        ? `${course.discount}% off`
                        : "No discount"}
                    </p>
                  </div>
                </td>

                {/* Earnings */}
                <td className="px-6 py-4 text-center font-semibold text-green-600">
                  {currency}{" "}
                  {Math.floor(
                    course.enrolledStudents.length *
                      (course.coursePrice -
                        (course.discount * course.coursePrice) / 100)
                  ).toLocaleString()}
                </td>

                {/* Students */}
                <td className="px-6 py-4 text-center font-medium text-blue-600">
                  {course.enrolledStudents.length}
                </td>

                {/* Published On */}
                <td className="px-6 py-4 text-center text-gray-500">
                  {new Date(course.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg font-medium">
      No courses found 🧐
    </div>
  );
};

export default MyCourses;
