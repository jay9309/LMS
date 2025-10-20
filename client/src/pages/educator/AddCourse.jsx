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

//   const navigate = useNavigate();
//   const { backendUrl, getToken, setCourses } = useContext(AppContext);

//   const [courseTitle, setCourseTitle] = useState("");
//   const [coursePrice, setCoursePrice] = useState(0);
//   const [discount, setDiscount] = useState(0);
//   const [image, setImage] = useState(null);
//   const [projectPdf, setProjectPdf] = useState(null);
//   const [chapters, setChapters] = useState([]);

//   useEffect(() => {
//     if (!quillRef.current && editorRef.current) {
//       quillRef.current = new Quill(editorRef.current, { theme: "snow" });
//     }
//   }, []);

//   // 📌 Add project using PDF link
//   const handleAddProject = () => {
//     const url = prompt("Paste the PDF link or YouTube video URL:");
//     if (!url) return;

//     const newChapter = {
//       chapterId: uniqid(),
//       chapterTitle: url.split("/").pop(), // Use filename from URL for display
//       chapterContent: [
//         {
//           lectureId: uniqid(),
//           lectureTitle: url.split("/").pop(),
//           lectureUrl: url, // store link for backend
//           isPreviewFree: false,
//           lectureDuration: "00:00",
//         },
//       ],
//       collapsed: false,
//       chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
//     };

//     setChapters([...chapters, newChapter]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (!image) return toast.error("Please select a course thumbnail");
//       if (!projectPdf) return toast.error("Please select a project PDF file");

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
//       formData.append("projectPdf", projectPdf);

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

//             <div className="flex-1">
//               <label className="block mb-2 font-medium">Project PDF</label>
//               <label htmlFor="projectPdf" className="flex items-center gap-3 cursor-pointer">
//                 <img src={assets.file_upload_icon} alt="upload" className="p-3 bg-yellow-400 rounded-md hover:bg-yellow-500 transition" />
//                 <input
//                   type="file"
//                   id="projectPdf"
//                   onChange={(e) => setProjectPdf(e.target.files[0])}
//                   accept=".pdf"
//                   hidden
//                 />
//                 {projectPdf && (
//                   <span className="text-sm text-gray-600">
//                     {projectPdf.name}
//                   </span>
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

//           {/* Chapters (PDF/Video Links) */}
//           <div className="mt-4">
//             <p className="font-semibold text-lg mb-3">Chapters</p>

//             <button
//               type="button"
//               onClick={handleAddProject}
//               className="px-5 py-2 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 transition-all"
//             >
//               + Add Project
//             </button>

//             <div className="mt-3 space-y-2">
//               {chapters.map((ch) => (
//                 <div key={ch.chapterId} className="p-2 border border-gray-300 rounded-md">
//                   <p>{ch.chapterTitle}</p>
//                   <a
//                     href={ch.chapterContent[0].lectureUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 underline"
//                   >
//                     Open
//                   </a>
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





import React, { useEffect, useRef, useState, useContext } from "react";
import { toast } from "react-toastify";
import Quill from "quill";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { useImageSelector } from "../../hooks/useImageSelector";
import ThumbnailUpload from "./ThumbnailUpload";

const AddCourse = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const {
    image,
    preview,
    inputRef,
    openPicker,
    handleChange,
    reset,
  } = useImageSelector();
  const { backendUrl, getToken } = useContext(AppContext);

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [pdfLink, setPdfLink] = useState("");
  const [domain, setDomain] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false); // prevent double submission

  useEffect(() => {
    const savedForm = sessionStorage.getItem("addCourseForm");
    if (savedForm) {
      const data = JSON.parse(savedForm);
      setCourseTitle(data.courseTitle || "");
      setCoursePrice(data.coursePrice || "");
      setDiscount(data.discount || "");
      setPdfLink(data.pdfLink || "");
      setDomain(data.domain || "");
      setDescription(data.description || "");
    }
  }, []);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
      quillRef.current.on("text-change", () => {
        const text = quillRef.current.root.innerText;
        setDescription(text);
        if (errors.description && text.trim() !== "") {
          setErrors(prev => ({ ...prev, description: "" }));
        }
      });

      const savedForm = sessionStorage.getItem("addCourseForm");
      if (savedForm) {
        const data = JSON.parse(savedForm);
        if (data.description) quillRef.current.root.innerHTML = data.description;
      }
    }
  }, [errors.description]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        const formState = {
          courseTitle,
          coursePrice,
          discount,
          pdfLink,
          domain,
          description,
        };
        sessionStorage.setItem("addCourseForm", JSON.stringify(formState));
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [courseTitle, coursePrice, discount, pdfLink, domain, description]);

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!courseTitle.trim()) newErrors.courseTitle = "Project Title is required";
    if (!description.trim()) newErrors.description = "Project Description is required";
    if (!domain.trim()) newErrors.domain = "Project Domain is required";
    if (!coursePrice || Number(coursePrice) < 0)
      newErrors.coursePrice = "Valid Project Price is required";
    if (discount && (Number(discount) < 0 || Number(discount) > 100))
      newErrors.discount = "Discount must be between 0 and 100";
    if (pdfLink && !isValidURL(pdfLink)) newErrors.pdfLink = "Enter a valid URL";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!validateForm()) {
      const firstErrorField = document.querySelector(".border-red-500");
      firstErrorField?.focus();
      return;
    }

    setSubmitting(true); // disable button
    try {
      const formData = new FormData();
      const selectedDomain = domain && domain.trim() !== "" ? domain : "General";
      const courseData = {
        courseTitle,
        courseDescription: description,
        coursePrice: Number(coursePrice),
        discount: Number(discount),
        domain: selectedDomain,
        pdfLink,
      };

      formData.append("courseData", JSON.stringify(courseData));
      if (image) formData.append("image", image);

      const token = await getToken();
 
  const { data } = await axios.post(
  `${backendUrl}api/educator/add-course`, // now correctly formed
  formData,
  { headers: { Authorization: `Bearer ${token}` } }
);


      if (data.success) {
        toast.success(data.message);
        resetForm();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.response?.data?.message || error.message);
    }
    setSubmitting(false); // enable button
  };

  const resetForm = () => {
    setCourseTitle("");
    setCoursePrice("");
    setDiscount("");
    setPdfLink("");
    setDomain("");
    setDescription("");
    setErrors({});
    sessionStorage.removeItem("addCourseForm");
    reset();
    if (quillRef.current) quillRef.current.root.innerHTML = "";
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex justify-center items-start bg-gradient-to-b from-gray-50 to-gray-200 py-10 px-4">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="w-full max-w-2xl bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-6 md:p-8 flex flex-col gap-6"
        >
          <h2 className="text-4xl font-extrabold text-center text-yellow-500 mb-4">
  Add New Project
</h2>

          {/* Project Title */}
          <div className="flex flex-col gap-1">
            <p className="font-semibold">Project Title</p>
            <input
              type="text"
              placeholder="Type here"
              className={`outline-none py-2.5 px-3 rounded border ${
                errors.courseTitle ? "border-red-500" : "border-gray-300"
              }`}
              value={courseTitle}
              onChange={(e) => {
                setCourseTitle(e.target.value);
                if (errors.courseTitle) setErrors(prev => ({ ...prev, courseTitle: "" }));
              }}
            />
            {errors.courseTitle && (
              <span className="text-red-500 text-sm">{errors.courseTitle}</span>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-gray-700 text-lg">Project Description</p>
            <div
              ref={editorRef}
              className={`min-h-[200px] p-4 rounded-xl border ${
                errors.description ? "border-red-500" : "border-gray-200"
              } focus-within:ring-2 focus-within:ring-cyan-300`}
            />
            {errors.description && (
              <span className="text-red-500 text-sm">{errors.description}</span>
            )}
          </div>

          {/* Domain */}
          <div className="flex flex-col gap-1">
            <p className="font-semibold">Project Domain</p>
            <select
              className={`outline-none py-2.5 px-3 rounded border ${
                errors.domain ? "border-red-500" : "border-gray-300"
              }`}
              value={domain}
              onChange={(e) => {
                setDomain(e.target.value);
                if (errors.domain) setErrors(prev => ({ ...prev, domain: "" }));
              }}
            >
              <option value="">Select Domain</option>
              <option value="Web Development">Web Development</option>
              <option value="Data Science">Data Science</option>
              <option value="AI">Artificial Intelligence</option>
              <option value="Blockchain">Blockchain</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="Cloud Computing">Cloud Computing</option>
            </select>
            {errors.domain && (
              <span className="text-red-500 text-sm">{errors.domain}</span>
            )}
          </div>

          {/* Price & Discount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Project Price (USD)</p>
              <input
                type="number"
                placeholder="0"
                min={0}
                step="0.01"
                className={`outline-none py-2 px-3 rounded border ${
                  errors.coursePrice ? "border-red-500" : "border-gray-300"
                }`}
                value={coursePrice}
                onChange={(e) => {
                  setCoursePrice(e.target.value);
                  if (errors.coursePrice) setErrors(prev => ({ ...prev, coursePrice: "" }));
                }}
              />
              {errors.coursePrice && (
                <span className="text-red-500 text-sm">{errors.coursePrice}</span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <p className="font-semibold">Discount %</p>
              <input
                type="number"
                placeholder="0"
                min={0}
                max={100}
                className={`outline-none py-2 px-3 rounded border ${
                  errors.discount ? "border-red-500" : "border-gray-300"
                }`}
                value={discount}
                onChange={(e) => {
                  setDiscount(e.target.value);
                  if (errors.discount) setErrors(prev => ({ ...prev, discount: "" }));
                }}
              />
              {errors.discount && (
                <span className="text-red-500 text-sm">{errors.discount}</span>
              )}
            </div>
          </div>

          {/* PDF / Drive Link */}
          <div className="flex flex-col gap-1">
            <p className="font-semibold">View More Details (Google Drive Link)</p>
            <input
              type="url"
              placeholder="Paste your Google Drive link here"
              className={`outline-none py-2 px-3 rounded border ${
                errors.pdfLink ? "border-red-500" : "border-gray-300"
              }`}
              value={pdfLink}
              onChange={(e) => {
                setPdfLink(e.target.value);
                if (errors.pdfLink) setErrors(prev => ({ ...prev, pdfLink: "" }));
              }}
            />
            {errors.pdfLink && (
              <span className="text-red-500 text-sm">{errors.pdfLink}</span>
            )}
          </div>

          {/* Thumbnail */}
          <ThumbnailUpload
            ref={inputRef}
            preview={preview}
            openPicker={openPicker}
            onSelect={handleChange}
          />

          {/* Submit */}
          <button
  type="submit"
  disabled={submitting}
  className={`mt-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white py-3 px-6 rounded-2xl shadow-md transition-all font-semibold ${
    submitting ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
  }`}
>
  {submitting ? "Adding..." : "Add Project"}
</button>

        </form>
      </div>
    </div>
  );
};

export default AddCourse;




