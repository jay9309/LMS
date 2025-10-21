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
  const [domain, setDomain] = useState("");
  const [projectLink, setProjectLink] = useState("");

  const domainOptions = [
    "Web Development",
    "Data Analytics",
    "Python with Data Science",
    "Cyber Security",
    "Robotics + Internet of Things",
    "Artificial Intelligence",
    "UI/UX",
    "Autocad",
    "VLSI",
  ];

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!image) return toast.error("Please select a course thumbnail");
      if (!domain) return toast.error("Please select a domain");
      if (!projectLink) return toast.error("Please add a project link");

      // Combine all information into one formatted description
      const quillContent = quillRef.current.root.innerHTML;
      const fullDescription = `
        <h3><strong>Domain:</strong> ${domain}</h3>
        <p><strong>Project Link:</strong> <a href="${projectLink}" target="_blank">${projectLink}</a></p>
        <hr/>
        ${quillContent}
      `;

      const courseData = {
        courseTitle,
        courseDescription: fullDescription, // ✅ everything combined here
        coursePrice: Number(coursePrice),
        discount: Number(discount),
        courseContent: [],
      };

      const formData = new FormData();
      formData.append("courseData", JSON.stringify(courseData));
      formData.append("image", image);

      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}api/educator/add-course`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        if (setCourses) setCourses((prev) => [...prev, data.course]);
        navigate("/educator/my-courses");
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-6 md:p-10">
      <div className="w-full max-w-3xl bg-white shadow-xl border border-gray-200 rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Create a New Project
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-gray-700">
          {/* Course Title */}
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

          {/* Description Box with domain & link inside */}
          <div className="border border-gray-300 rounded-lg bg-gray-50">
            <div className="px-4 pt-3">
              <label className="block font-medium text-gray-700">
                Project Description
              </label>
            </div>

            {/* Domain dropdown */}
            <div className="px-4 mt-2">
              <label className="block mb-1 text-sm font-medium">Select Domain</label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                required
              >
                <option value="">-- Choose Domain --</option>
                {domainOptions.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Project link input */}
            <div className="px-4 mt-3">
              <label className="block mb-1 text-sm font-medium">Paste Project Link</label>
              <input
                type="url"
                placeholder="https://example.com/project"
                value={projectLink}
                onChange={(e) => setProjectLink(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                required
              />
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-3"></div>

            {/* Quill Editor */}
            <div
              ref={editorRef}
              className="mx-4 mb-4 border border-gray-200 rounded-md min-h-[120px] bg-white"
            ></div>
          </div>

          {/* Price, Discount, and Thumbnail */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div>
              <label className="block mb-2 font-medium">Project Price</label>
              <input
                type="number"
                value={coursePrice}
                onChange={(e) => setCoursePrice(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Discount (%)</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                min={0}
                max={100}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Thumbnail Image</label>
              <label
                htmlFor="thumbnailImage"
                className="flex items-center gap-3 cursor-pointer"
              >
                <img
                  src={assets.file_upload_icon}
                  alt="upload"
                  className="p-3 bg-yellow-400 rounded-md hover:bg-yellow-500 transition"
                />
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









