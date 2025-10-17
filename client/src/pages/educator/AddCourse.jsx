// // // // import React, { useContext, useEffect, useRef, useState } from "react";
// // // // import { assets } from "../../assets/assets";
// // // // import { toast } from "react-toastify";
// // // // import Quill from "quill";
// // // // import uniqid from "uniqid";
// // // // import axios from "axios";
// // // // import { AppContext } from "../../context/AppContext";
// // // // import { useNavigate } from "react-router-dom";

// // // // const AddCourse = () => {
// // // //   const editorRef = useRef(null);
// // // //   const quillRef = useRef(null);

// // // //   const navigate = useNavigate();
// // // //   const { backendUrl, getToken, setCourses } = useContext(AppContext);

// // // //   const [courseTitle, setCourseTitle] = useState("");
// // // //   const [coursePrice, setCoursePrice] = useState(0);
// // // //   const [discount, setDiscount] = useState(0);
// // // //   const [image, setImage] = useState(null);
// // // //   const [chapters, setChapters] = useState([]);
// // // //   const [showPopup, setShowPopup] = useState(false);
// // // //   const [currentChapterId, setCurrentChapterId] = useState(null);
// // // //   const [lectureDetails, setLectureDetails] = useState({
// // // //     lectureTitle: "",
// // // //     lectureDuration: "",
// // // //     lectureUrl: "",
// // // //     isPreviewFree: false,
// // // //   });

// // // //   // 🧠 Chapter & Lecture handlers
// // // //   const handleChapter = (action, chapterId) => {
// // // //     if (action === "add") {
// // // //       const title = prompt("Enter Chapter Name:");
// // // //       if (title) {
// // // //         const newChapter = {
// // // //           chapterId: uniqid(),
// // // //           chapterTitle: title,
// // // //           chapterContent: [],
// // // //           collapsed: false,
// // // //           chapterOrder:
// // // //             chapters.length > 0
// // // //               ? chapters.slice(-1)[0].chapterOrder + 1
// // // //               : 1,
// // // //         };
// // // //         setChapters([...chapters, newChapter]);
// // // //       }
// // // //     } else if (action === "remove") {
// // // //       setChapters(chapters.filter((ch) => ch.chapterId !== chapterId));
// // // //     } else if (action === "toggle") {
// // // //       setChapters(
// // // //         chapters.map((ch) =>
// // // //           ch.chapterId === chapterId
// // // //             ? { ...ch, collapsed: !ch.collapsed }
// // // //             : ch
// // // //         )
// // // //       );
// // // //     }
// // // //   };

// // // //   const handleLecture = (action, chapterId, lectureIndex) => {
// // // //     if (action === "add") {
// // // //       setCurrentChapterId(chapterId);
// // // //       setShowPopup(true);
// // // //     } else if (action === "remove") {
// // // //       setChapters(
// // // //         chapters.map((chapter) => {
// // // //           if (chapter.chapterId === chapterId) {
// // // //             chapter.chapterContent.splice(lectureIndex, 1);
// // // //           }
// // // //           return chapter;
// // // //         })
// // // //       );
// // // //     }
// // // //   };

// // // //   const addLecture = () => {
// // // //     setChapters(
// // // //       chapters.map((chapter) => {
// // // //         if (chapter.chapterId === currentChapterId) {
// // // //           const newLecture = {
// // // //             ...lectureDetails,
// // // //             lectureOrder:
// // // //               chapter.chapterContent.length > 0
// // // //                 ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1
// // // //                 : 1,
// // // //             lectureId: uniqid(),
// // // //           };
// // // //           chapter.chapterContent.push(newLecture);
// // // //         }
// // // //         return chapter;
// // // //       })
// // // //     );
// // // //     setShowPopup(false);
// // // //     setLectureDetails({
// // // //       lectureTitle: "",
// // // //       lectureDuration: "",
// // // //       lectureUrl: "",
// // // //       isPreviewFree: false,
// // // //     });
// // // //   };

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     try {
// // // //       if (!image) return toast.error("Please select a course thumbnail");

// // // //       const courseData = {
// // // //         courseTitle,
// // // //         courseDescription: quillRef.current.root.innerHTML,
// // // //         coursePrice: Number(coursePrice),
// // // //         discount: Number(discount),
// // // //         courseContent: chapters,
// // // //       };

// // // //       const formData = new FormData();
// // // //       formData.append("courseData", JSON.stringify(courseData));
// // // //       formData.append("image", image);

// // // //       const token = await getToken();
// // // //       const { data } = await axios.post(
// // // //         `${backendUrl}api/educator/add-course`,
// // // //         formData,
// // // //         { headers: { Authorization: `Bearer ${token}` } }
// // // //       );

// // // //       if (data.success) {
// // // //         toast.success(data.message);
// // // //         if (setCourses) setCourses((prev) => [...prev, data.course]);
// // // //         navigate("/educator/my-courses");
// // // //       } else toast.error(data.message);
// // // //     } catch (error) {
// // // //       toast.error(error.message);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     if (!quillRef.current && editorRef.current) {
// // // //       quillRef.current = new Quill(editorRef.current, { theme: "snow" });
// // // //     }
// // // //   }, []);

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-6 md:p-10">
// // // //       <div className="w-full max-w-3xl bg-white shadow-xl border border-gray-200 rounded-2xl p-8">
// // // //         <h1 className="text-3xl font-bold text-gray-800 mb-8">
// // // //           Create a New Project
// // // //         </h1>

// // // //         <form
// // // //           onSubmit={handleSubmit}
// // // //           className="flex flex-col gap-6 text-gray-700"
// // // //         >
// // // //           {/* Title */}
// // // //           <div>
// // // //             <label className="block mb-2 font-medium">Course Title</label>
// // // //             <input
// // // //               type="text"
// // // //               value={courseTitle}
// // // //               onChange={(e) => setCourseTitle(e.target.value)}
// // // //               placeholder="Enter project title"
// // // //               className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
// // // //               required
// // // //             />
// // // //           </div>

// // // //           {/* Description */}
// // // //           <div>
// // // //             <label className="block mb-2 font-medium">Project Description</label>
// // // //             <div
// // // //               ref={editorRef}
// // // //               className="border border-gray-300 rounded-md min-h-[120px] bg-gray-50"
// // // //             ></div>
// // // //           </div>

// // // //           {/* Price & Thumbnail */}
// // // //           <div className="flex flex-col md:flex-row gap-6">
// // // //             <div className="flex-1">
// // // //               <label className="block mb-2 font-medium">Project Price</label>
// // // //               <input
// // // //                 type="number"
// // // //                 value={coursePrice}
// // // //                 onChange={(e) => setCoursePrice(e.target.value)}
// // // //                 className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
// // // //                 required
// // // //               />
// // // //             </div>

// // // //             <div className="flex-1">
// // // //               <label className="block mb-2 font-medium">Thumbnail Image</label>
// // // //               <label
// // // //                 htmlFor="thumbnailImage"
// // // //                 className="flex items-center gap-3 cursor-pointer"
// // // //               >
// // // //                 <img
// // // //                   src={assets.file_upload_icon}
// // // //                   alt="upload"
// // // //                   className="p-3 bg-yellow-400 rounded-md hover:bg-yellow-500 transition"
// // // //                 />
// // // //                 <input
// // // //                   type="file"
// // // //                   id="thumbnailImage"
// // // //                   onChange={(e) => setImage(e.target.files[0])}
// // // //                   accept="image/*"
// // // //                   hidden
// // // //                 />
// // // //                 {image && (
// // // //                   <img
// // // //                     src={URL.createObjectURL(image)}
// // // //                     alt="preview"
// // // //                     className="max-h-12 rounded-md border"
// // // //                   />
// // // //                 )}
// // // //               </label>
// // // //             </div>
// // // //           </div>

// // // //           {/* Discount */}
// // // //           <div>
// // // //             <label className="block mb-2 font-medium">Discount (%)</label>
// // // //             <input
// // // //               type="number"
// // // //               value={discount}
// // // //               onChange={(e) => setDiscount(e.target.value)}
// // // //               min={0}
// // // //               max={100}
// // // //               className="w-32 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
// // // //             />
// // // //           </div>

// // // //           {/* Chapters (Placeholder UI) */}
// // // //           <div className="mt-4">
// // // //             <p className="font-semibold text-lg mb-3">Chapters</p>
// // // //             <button
// // // //               type="button"
// // // //               onClick={() => handleChapter("add")}
// // // //               className="px-5 py-2 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 transition-all"
// // // //             >
// // // //               + Add Project
// // // //             </button>
// // // //           </div>

// // // //           {/* Submit */}
// // // //           <div className="flex justify-end mt-8">
// // // //             <button
// // // //               type="submit"
// // // //               className="bg-yellow-400 text-black font-bold px-8 py-3 rounded-lg shadow hover:bg-yellow-500 hover:scale-105 transition-all"
// // // //             >
// // // //               Add Project
// // // //             </button>
// // // //           </div>
// // // //         </form>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default AddCourse;


// // import React, { useContext, useEffect, useRef, useState } from "react";
// // import { assets } from "../../assets/assets";
// // import { toast } from "react-toastify";
// // import Quill from "quill";
// // import uniqid from "uniqid";
// // import axios from "axios";
// // import { AppContext } from "../../context/AppContext";
// // import { useNavigate } from "react-router-dom";

// // const AddCourse = () => {
// //   const editorRef = useRef(null);
// //   const quillRef = useRef(null);
// //   const fileInputRef = useRef(null); // 📌 ref for PDF input

// //   const navigate = useNavigate();
// //   const { backendUrl, getToken, setCourses } = useContext(AppContext);

// //   const [courseTitle, setCourseTitle] = useState("");
// //   const [coursePrice, setCoursePrice] = useState(0);
// //   const [discount, setDiscount] = useState(0);
// //   const [image, setImage] = useState(null);
// //   const [chapters, setChapters] = useState([]);

// //   useEffect(() => {
// //     if (!quillRef.current && editorRef.current) {
// //       quillRef.current = new Quill(editorRef.current, { theme: "snow" });
// //     }
// //   }, []);

// //   const handleAddPDF = (file) => {
// //     if (!file) return;
// //     const newChapter = {
// //       chapterId: uniqid(),
// //       chapterTitle: file.name,
// //       chapterContent: [
// //         {
// //           lectureId: uniqid(),
// //           lectureTitle: file.name,
// //           lectureFile: file,
// //         },
// //       ],
// //       collapsed: false,
// //       chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
// //     };
// //     setChapters([...chapters, newChapter]);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       if (!image) return toast.error("Please select a course thumbnail");

// //       const courseData = {
// //         courseTitle,
// //         courseDescription: quillRef.current.root.innerHTML,
// //         coursePrice: Number(coursePrice),
// //         discount: Number(discount),
// //         courseContent: chapters,
// //       };

// //       const formData = new FormData();
// //       formData.append("courseData", JSON.stringify(courseData));
// //       formData.append("image", image);

// //       const token = await getToken();
// //       const { data } = await axios.post(
// //         `${backendUrl}api/educator/add-course`,
// //         formData,
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );

// //       if (data.success) {
// //         toast.success(data.message);
// //         if (setCourses) setCourses((prev) => [...prev, data.course]);
// //         navigate("/educator/my-courses");
// //       } else toast.error(data.message);
// //     } catch (error) {
// //       toast.error(error.message);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-6 md:p-10">
// //       <div className="w-full max-w-3xl bg-white shadow-xl border border-gray-200 rounded-2xl p-8">
// //         <h1 className="text-3xl font-bold text-gray-800 mb-8">Create a New Project</h1>

// //         <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-gray-700">
// //           {/* Title */}
// //           <div>
// //             <label className="block mb-2 font-medium">Course Title</label>
// //             <input
// //               type="text"
// //               value={courseTitle}
// //               onChange={(e) => setCourseTitle(e.target.value)}
// //               placeholder="Enter project title"
// //               className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
// //               required
// //             />
// //           </div>

// //           {/* Description */}
// //           <div>
// //             <label className="block mb-2 font-medium">Project Description</label>
// //             <div ref={editorRef} className="border border-gray-300 rounded-md min-h-[120px] bg-gray-50"></div>
// //           </div>

// //           {/* Price & Thumbnail */}
// //           <div className="flex flex-col md:flex-row gap-6">
// //             <div className="flex-1">
// //               <label className="block mb-2 font-medium">Project Price</label>
// //               <input
// //                 type="number"
// //                 value={coursePrice}
// //                 onChange={(e) => setCoursePrice(e.target.value)}
// //                 className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
// //                 required
// //               />
// //             </div>

// //             <div className="flex-1">
// //               <label className="block mb-2 font-medium">Thumbnail Image</label>
// //               <label htmlFor="thumbnailImage" className="flex items-center gap-3 cursor-pointer">
// //                 <img src={assets.file_upload_icon} alt="upload" className="p-3 bg-yellow-400 rounded-md hover:bg-yellow-500 transition" />
// //                 <input
// //                   type="file"
// //                   id="thumbnailImage"
// //                   onChange={(e) => setImage(e.target.files[0])}
// //                   accept="image/*"
// //                   hidden
// //                 />
// //                 {image && (
// //                   <img
// //                     src={URL.createObjectURL(image)}
// //                     alt="preview"
// //                     className="max-h-12 rounded-md border"
// //                   />
// //                 )}
// //               </label>
// //             </div>
// //           </div>

// //           {/* Discount */}
// //           <div>
// //             <label className="block mb-2 font-medium">Discount (%)</label>
// //             <input
// //               type="number"
// //               value={discount}
// //               onChange={(e) => setDiscount(e.target.value)}
// //               min={0}
// //               max={100}
// //               className="w-32 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
// //             />
// //           </div>

// //           {/* Chapters (PDF upload) */}
// //           <div className="mt-4">
// //             <p className="font-semibold text-lg mb-3">Chapters</p>

// //             {/* Add Project Button */}
// //             <button
// //               type="button"
// //               onClick={() => fileInputRef.current.click()}
// //               className="px-5 py-2 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 transition-all"
// //             >
// //               + Add Project
// //             </button>

// //             {/* Hidden File Input */}
// //             <input
// //               type="file"
// //               accept="application/pdf"
// //               ref={fileInputRef}
// //               style={{ display: "none" }}
// //               onChange={(e) => handleAddPDF(e.target.files[0])}
// //             />

// //             {/* Display uploaded chapters */}
// //             <div className="mt-3 space-y-2">
// //               {chapters.map((ch) => (
// //                 <div key={ch.chapterId} className="p-2 border border-gray-300 rounded-md">
// //                   {ch.chapterTitle} ({ch.chapterContent[0].lectureFile.name})
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Submit */}
// //           <div className="flex justify-end mt-8">
// //             <button
// //               type="submit"
// //               className="bg-yellow-400 text-black font-bold px-8 py-3 rounded-lg shadow hover:bg-yellow-500 hover:scale-105 transition-all"
// //             >
// //               Add Project
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AddCourse;


// import React, { useContext, useEffect, useRef, useState } from "react";
// import { assets } from "../../assets/assets"; 
// import { toast } from "react-toastify";
// import Quill from "quill";
// import uniqid from "uniqid";
// import axios from "axios";
// import { AppContext } from "../../context/AppContext";
// import { useNavigate } from "react-router-dom";

// const AddCourse = () => {
//   const editorRef = useRef(null);
//   const quillRef = useRef(null);
//   const fileInputRef = useRef(null); // PDF input

//   const navigate = useNavigate();
//   const { backendUrl, getToken, setCourses } = useContext(AppContext);

//   const [courseTitle, setCourseTitle] = useState("");
//   const [coursePrice, setCoursePrice] = useState(0);
//   const [discount, setDiscount] = useState(0);
//   const [image, setImage] = useState(null);
//   const [chapters, setChapters] = useState([]);

//   useEffect(() => {
//     if (!quillRef.current && editorRef.current) {
//       quillRef.current = new Quill(editorRef.current, { theme: "snow" });
//     }
//   }, []);

//   // Handle PDF selection
//   const handleAddPDF = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const newChapter = {
//       chapterId: uniqid(),
//       chapterTitle: file.name,
//       chapterContent: [
//         {
//           lectureId: uniqid(),
//           lectureTitle: file.name,
//           lectureFile: file,
//         },
//       ],
//       collapsed: false,
//       chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
//     };
//     setChapters((prev) => [...prev, newChapter]);

//     // Clear the input so the same file can be selected again if needed
//     e.target.value = null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (!image) return toast.error("Please select a course thumbnail");

//       const courseData = {
//         courseTitle,
//         courseDescription: quillRef.current.root.innerHTML,
//         coursePrice: Number(coursePrice),
//         discount: Number(discount),
//         courseContent: chapters,
//       };

//       const formData = new FormData();
//       formData.append("courseData", JSON.stringify(courseData));
//       formData.append("image", image);

//       chapters.forEach((ch) => {
//         ch.chapterContent.forEach((lec) => {
//           formData.append("chapterFiles", lec.lectureFile);
//         });
//       });

//       const token = await getToken();
//       const { data } = await axios.post(
//         `${backendUrl}api/educator/add-course`,
//         formData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (data.success) {
//         toast.success(data.message);
//         if (setCourses) setCourses((prev) => [...prev, data.course]);
//         navigate("/educator/my-courses");
//       } else toast.error(data.message);
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-6 md:p-10">
//       <div className="w-full max-w-3xl bg-white shadow-xl border border-gray-200 rounded-2xl p-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8">Create a New Project</h1>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-gray-700">
//           {/* Title */}
//           <div>
//             <label className="block mb-2 font-medium">Course Title</label>
//             <input
//               type="text"
//               value={courseTitle}
//               onChange={(e) => setCourseTitle(e.target.value)}
//               placeholder="Enter project title"
//               className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
//               required
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block mb-2 font-medium">Project Description</label>
//             <div ref={editorRef} className="border border-gray-300 rounded-md min-h-[120px] bg-gray-50"></div>
//           </div>

//           {/* Price & Thumbnail */}
//           <div className="flex flex-col md:flex-row gap-6">
//             <div className="flex-1">
//               <label className="block mb-2 font-medium">Project Price</label>
//               <input
//                 type="number"
//                 value={coursePrice}
//                 onChange={(e) => setCoursePrice(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
//                 required
//               />
//             </div>

//             <div className="flex-1">
//               <label className="block mb-2 font-medium">Thumbnail Image</label>
//               <label htmlFor="thumbnailImage" className="flex items-center gap-3 cursor-pointer">
//                 <img src={assets.file_upload_icon} alt="upload" className="p-3 bg-yellow-400 rounded-md hover:bg-yellow-500 transition" />
//                 <input
//                   type="file"
//                   id="thumbnailImage"
//                   onChange={(e) => setImage(e.target.files[0])}
//                   accept="image/*"
//                   hidden
//                 />
//                 {image && (
//                   <img
//                     src={URL.createObjectURL(image)}
//                     alt="preview"
//                     className="max-h-12 rounded-md border"
//                   />
//                 )}
//               </label>
//             </div>
//           </div>

//           {/* Discount */}
//           <div>
//             <label className="block mb-2 font-medium">Discount (%)</label>
//             <input
//               type="number"
//               value={discount}
//               onChange={(e) => setDiscount(e.target.value)}
//               min={0}
//               max={100}
//               className="w-32 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
//             />
//           </div>

//           {/* Chapters (PDF upload) */}
//           <div className="mt-4">
//             <p className="font-semibold text-lg mb-3">Chapters</p>

//             <button
//               type="button"
//               onClick={() => fileInputRef.current.click()}
//               className="px-5 py-2 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 transition-all"
//             >
//               + Add Project
//             </button>

//             <input
//               type="file"
//               accept="application/pdf"
//               ref={fileInputRef}
//               style={{ display: "none" }}
//               onChange={handleAddPDF}
//             />

//             {/* Display uploaded chapters */}
//             <div className="mt-3 space-y-2">
//               {chapters.map((ch) => (
//                 <div key={ch.chapterId} className="flex items-center p-2 border border-gray-300 rounded-md gap-2">
//                   <img src={assets.pdf_icon} alt="pdf_icon" className="w-6 h-6" />
//                   <span>{ch.chapterTitle}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Submit */}
//           <div className="flex justify-end mt-8">
//             <button
//               type="submit"
//               className="bg-yellow-400 text-black font-bold px-8 py-3 rounded-lg shadow hover:bg-yellow-500 hover:scale-105 transition-all"
//             >
//               Add Project
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddCourse;


import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import Quill from "quill";
import uniqid from "uniqid";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const navigate = useNavigate();
  const { backendUrl, getToken, setCourses } = useContext(AppContext);

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  // 📌 Add project using PDF link
  const handleAddProject = () => {
    const url = prompt("Paste the PDF link or YouTube video URL:");
    if (!url) return;

    const newChapter = {
      chapterId: uniqid(),
      chapterTitle: url.split("/").pop(), // Use filename from URL for display
      chapterContent: [
        {
          lectureId: uniqid(),
          lectureTitle: url.split("/").pop(),
          lectureUrl: url, // store link for backend
          isPreviewFree: false,
          lectureDuration: "00:00",
        },
      ],
      collapsed: false,
      chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
    };

    setChapters([...chapters, newChapter]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!image) return toast.error("Please select a course thumbnail");

      const courseData = {
        courseTitle,
        courseDescription: quillRef.current.root.innerHTML,
        coursePrice: Number(coursePrice),
        discount: Number(discount),
        courseContent: chapters,
      };


      console.log("courseData",courseData)

      const formData = new FormData();
      formData.append("courseData", JSON.stringify(courseData));
      formData.append("image", image);

      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}api/educator/add-course`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("data"+data)

      if (data.success) {
        toast.success(data.message);
        if (setCourses) setCourses((prev) => [...prev, data.course]);
        navigate("/educator/my-courses");
      } else{
toast.error(data.message);
console.log(data.message)
      } 
    } catch (error) {
      toast.error(error.message);
console.log(error)

    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-6 md:p-10">
      <div className="w-full max-w-3xl bg-white shadow-xl border border-gray-200 rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Create a New Project</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-gray-700">
          {/* Title */}
          <div>
            <label className="block mb-2 font-medium">Course Title</label>
            <input
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              placeholder="Enter project title"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-medium">Project Description</label>
            <div ref={editorRef} className="border border-gray-300 rounded-md min-h-[120px] bg-gray-50"></div>
          </div>

          {/* Price & Thumbnail */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block mb-2 font-medium">Project Price</label>
              <input
                type="number"
                value={coursePrice}
                onChange={(e) => setCoursePrice(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block mb-2 font-medium">Thumbnail Image</label>
              <label htmlFor="thumbnailImage" className="flex items-center gap-3 cursor-pointer">
                <img src={assets.file_upload_icon} alt="upload" className="p-3 bg-yellow-400 rounded-md hover:bg-yellow-500 transition" />
                <input
                  type="file"
                  id="thumbnailImage"
                  onChange={(e) => setImage(e.target.files[0])}
                  accept="image/*"
                  hidden
                />
                {image && (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="preview"
                    className="max-h-12 rounded-md border"
                  />
                )}
              </label>
            </div>
          </div>

          {/* Discount */}
          <div>
            <label className="block mb-2 font-medium">Discount (%)</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              min={0}
              max={100}
              className="w-32 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
          </div>

          {/* Chapters (PDF/Video Links) */}
          <div className="mt-4">
            <p className="font-semibold text-lg mb-3">Chapters</p>

            <button
              type="button"
              onClick={handleAddProject}
              className="px-5 py-2 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 transition-all"
            >
              + Add Project
            </button>

            <div className="mt-3 space-y-2">
              {chapters.map((ch) => (
                <div key={ch.chapterId} className="p-2 border border-gray-300 rounded-md">
                  <p>{ch.chapterTitle}</p>
                  <a
                    href={ch.chapterContent[0].lectureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Open
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="bg-yellow-400 text-black font-bold px-8 py-3 rounded-lg shadow hover:bg-yellow-500 hover:scale-105 transition-all"
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
