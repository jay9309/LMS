import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../components/student/Loading";

const Dashboard = () => {
  const { backendUrl, isEducator, currency, getToken } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = await getToken();

        const { data } = await axios.get(`${backendUrl}api/educator/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.success) {
          setDashboardData(data.dashboardData);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (isEducator) {
      fetchDashboardData();
    }
  }, [isEducator, backendUrl, getToken]);

  if (loading) {
    return (
      <div className="p-8 animate-pulse grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 bg-gray-800 rounded-xl"></div>
        ))}
        <div className="col-span-3 mt-6 h-80 bg-gray-800 rounded-xl"></div>
      </div>
    );
  }

  return dashboardData ? (
    <div className="min-h-screen flex flex-col items-start justify-between gap-10 md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="space-y-12">
        {/* ---- Stats Section ---- */}
        <div className="flex flex-wrap gap-8 items-center justify-center">
          {/* Total Enrollments */}
          <div className="flex items-center gap-6 p-6 w-72 h-40 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-300 shadow-2xl transform transition-transform duration-300 hover:-translate-y-3 hover:shadow-3xl">
            <img src={assets.patients_icon} alt="enrollments" className="w-16 h-16" />
            <div className="flex flex-col">
              <p className="text-4xl font-extrabold text-white">
                {dashboardData.enrolledStudentsData.length}
              </p>
              <p className="text-white/90 font-semibold">Total Enrollments</p>
            </div>
          </div>

          {/* Total Courses */}
          <div className="flex items-center gap-6 p-6 w-72 h-40 rounded-2xl bg-gradient-to-r from-blue-400 to-blue-300 shadow-2xl transform transition-transform duration-300 hover:-translate-y-3 hover:shadow-3xl">
            <img src={assets.appointments_icon} alt="courses" className="w-16 h-16" />
            <div className="flex flex-col">
              <p className="text-4xl font-extrabold text-white">{dashboardData.totalCourses}</p>
              <p className="text-white/90 font-semibold">Total Courses</p>
            </div>
          </div>

          {/* Total Earnings */}
          <div className="flex items-center gap-6 p-6 w-72 h-40 rounded-2xl bg-gradient-to-r from-green-400 to-green-300 shadow-2xl transform transition-transform duration-300 hover:-translate-y-3 hover:shadow-3xl">
            <img src={assets.earning_icon} alt="earnings" className="w-16 h-16" />
            <div className="flex flex-col">
              <p className="text-4xl font-extrabold text-white">
                {currency}{Math.floor(dashboardData.totalEarnings)}
              </p>
              <p className="text-white/90 font-semibold">Total Earnings</p>
            </div>
          </div>
        </div>

        {/* ---- Enrollments Table ---- */}
        <div className="w-full">
          <h2 className="pb-4 text-xl md:text-2xl font-bold text-gray-800">Recent Learners</h2>
          <div className="overflow-x-auto rounded-xl border border-gray-300/30 shadow-lg">
            <table className="min-w-full divide-y divide-gray-300/30">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">#</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Student Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Course Title</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardData.enrolledStudentsData.map((item, index) => (
                  <tr key={index} className="hover:bg-yellow-50 transition-colors duration-200">
                    <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img src={item.student.imageUrl} alt="Profile" className="w-12 h-12 rounded-full" />
                      <span className="truncate font-medium">{item.student.name}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 truncate">{item.courseTitle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Dashboard;
