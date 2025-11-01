// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { AppContext } from '../../context/AppContext';
// import { toast } from 'react-toastify';
// import Loading from '../../components/student/Loading';

// const StudentsEnrolled = () => {

//   const { backendUrl, getToken, isEducator } = useContext(AppContext)

//   const [enrolledStudents, setEnrolledStudents] = useState(null)

//   const fetchEnrolledStudents = async () => {
//     try {
//       const token = await getToken()

//       const { data } = await axios.get(backendUrl + 'api/educator/enrolled-students',
//         { headers: { Authorization: `Bearer ${token}` } }
//       )

//       if (data.success) {
//         setEnrolledStudents(data.enrolledStudents.reverse())
//       } else {
//         toast.success(data.message)
//       }

//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   useEffect(() => {
//     if (isEducator) {
//       fetchEnrolledStudents()
//     }
//   }, [isEducator])

//   return enrolledStudents ? (
//     <div className="min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
//       <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20 ">
//         <table className="table-fixed md:table-auto w-full overflow-hidden pb-4">
//           <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
//             <tr>
//               <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">#</th>
//               <th className="px-4 py-3 font-semibold">Student Name</th>
//               <th className="px-4 py-3 font-semibold">Course Title</th>
//               <th className="px-4 py-3 font-semibold hidden sm:table-cell">Date</th>
//             </tr>
//           </thead>
//           <tbody className="text-sm text-gray-500">
//             {enrolledStudents.map((item, index) => (
//               <tr key={index} className="border-b border-gray-500/20">
//                 <td className="px-4 py-3 text-center hidden sm:table-cell">{index + 1}</td>
//                 <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
//                   <img
//                     src={item.student.imageUrl}
//                     alt=""
//                     className="w-9 h-9 rounded-full"
//                   />
//                   <span className="truncate">{item.student.name}</span>
//                 </td>
//                 <td className="px-4 py-3 truncate">{item.courseTitle}</td>
//                 <td className="px-4 py-3 hidden sm:table-cell">{new Date(item.purchaseDate).toLocaleDateString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   ) : <Loading />
// };

// export default StudentsEnrolled;


import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import Loading from '../../components/student/Loading';

const StudentsEnrolled = () => {
  const { backendUrl, getToken, isEducator } = useContext(AppContext);
  const [enrolledStudents, setEnrolledStudents] = useState(null);

  const fetchEnrolledStudents = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(
        backendUrl + 'api/educator/enrolled-students',
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setEnrolledStudents(data.enrolledStudents.reverse());
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isEducator) {
      fetchEnrolledStudents();
    }
  }, [isEducator]);

  return enrolledStudents ? (
    <div className="min-h-screen flex flex-col items-center justify-start md:p-10 p-4 bg-gray-50">
      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-8 border-b-4 border-yellow-400 pb-2">
        Students Enrolled
      </h1>

      {/* Table Container */}
      <div className="w-full max-w-6xl overflow-x-auto rounded-xl shadow-lg bg-white border border-gray-200">
        <table className="min-w-full border-collapse">
          {/* Table Header */}
          <thead className="bg-yellow-400/90 text-gray-900 uppercase text-sm">
            <tr>
              <th className="px-4 py-3 text-center hidden sm:table-cell">#</th>
              <th className="px-4 py-3 text-left">Student Name</th>
              <th className="px-4 py-3 text-left">Course Title</th>
              <th className="px-4 py-3 text-center hidden sm:table-cell">Date</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-gray-700 text-sm">
            {enrolledStudents.map((item, index) => (
              <tr
                key={index}
                className={`border-t border-gray-100 hover:bg-yellow-50 transition duration-200 ${
                  index % 2 === 0 ? 'bg-gray-50/40' : 'bg-white'
                }`}
              >
                <td className="px-4 py-3 text-center hidden sm:table-cell font-medium text-gray-600">
                  {index + 1}
                </td>

                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={item.student.imageUrl}
                    alt="student"
                    className="w-10 h-10 rounded-full border border-gray-200 object-cover"
                  />
                  <span className="font-medium text-gray-800">{item.student.name}</span>
                </td>

                <td className="px-4 py-3">{item.courseTitle}</td>

                <td className="px-4 py-3 text-center hidden sm:table-cell">
                  {new Date(item.purchaseDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Count Summary */}
      <p className="mt-6 text-gray-600 text-sm">
        Total Enrollments: <span className="font-semibold">{enrolledStudents.length}</span>
      </p>
    </div>
  ) : (
    <Loading />
  );
};

export default StudentsEnrolled;
