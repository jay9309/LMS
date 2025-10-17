// import { v2 as cloudinary } from 'cloudinary'
// import Course from '../models/Course.js';
// import { Purchase } from '../models/Purchase.js';
// import User from '../models/User.js';
// import { clerkClient } from '@clerk/express'

// // update role to educator
// export const updateRoleToEducator = async (req, res) => {

//     try {

//         const userId = req.auth.userId

//         await clerkClient.users.updateUserMetadata(userId, {
//             publicMetadata: {
//                 role: 'educator',
//             },
//         })

//         res.json({ success: true, message: 'You can publish a course now' })

//     } catch (error) {
//         res.json({ success: false, message: error.message })
//     }

// }

// // Add New Course
// export const addCourse = async (req, res) => {

//     try {

//         const { courseData } = req.body

//         const imageFile = req.file

//         const educatorId = req.auth.userId

//         if (!imageFile) {
//             return res.json({ success: false, message: 'Thumbnail Not Attached' })
//         }

//         const parsedCourseData = await JSON.parse(courseData)

//         parsedCourseData.educator = educatorId

//         const newCourse = await Course.create(parsedCourseData)

//         const imageUpload = await cloudinary.uploader.upload(imageFile.path)

//         newCourse.courseThumbnail = imageUpload.secure_url

//         await newCourse.save()

//         res.json({ success: true, message: 'Course Added' })

//     } catch (error) {

//         res.json({ success: false, message: error.message })

//     }
// }

// // Get Educator Courses
// export const getEducatorCourses = async (req, res) => {
//     try {

//         const educator = req.auth.userId

//         const courses = await Course.find({ educator })

//         res.json({ success: true, courses })

//     } catch (error) {
//         res.json({ success: false, message: error.message })
//     }
// }

// // Get Educator Dashboard Data ( Total Earning, Enrolled Students, No. of Courses)
// export const educatorDashboardData = async (req, res) => {
//     try {
//         const educator = req.auth.userId;

//         const courses = await Course.find({ educator });

//         const totalCourses = courses.length;

//         const courseIds = courses.map(course => course._id);

//         // Calculate total earnings from purchases
//         const purchases = await Purchase.find({
//             courseId: { $in: courseIds },
//             status: 'completed'
//         });

//         const totalEarnings = purchases.reduce((sum, purchase) => sum + purchase.amount, 0);

//         // Collect unique enrolled student IDs with their course titles
//         const enrolledStudentsData = [];
//         for (const course of courses) {
//             const students = await User.find({
//                 _id: { $in: course.enrolledStudents }
//             }, 'name imageUrl');

//             students.forEach(student => {
//                 enrolledStudentsData.push({
//                     courseTitle: course.courseTitle,
//                     student
//                 });
//             });
//         }

//         res.json({
//             success: true,
//             dashboardData: {
//                 totalEarnings,
//                 enrolledStudentsData,
//                 totalCourses
//             }
//         });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// };

// // Get Enrolled Students Data with Purchase Data
// export const getEnrolledStudentsData = async (req, res) => {
//     try {
//         const educator = req.auth.userId;

//         // Fetch all courses created by the educator
//         const courses = await Course.find({ educator });

//         // Get the list of course IDs
//         const courseIds = courses.map(course => course._id);

//         // Fetch purchases with user and course data
//         const purchases = await Purchase.find({
//             courseId: { $in: courseIds },
//             status: 'completed'
//         }).populate('userId', 'name imageUrl').populate('courseId', 'courseTitle');

//         // enrolled students data
//         const enrolledStudents = purchases.map(purchase => ({
//             student: purchase.userId,
//             courseTitle: purchase.courseId.courseTitle,
//             purchaseDate: purchase.createdAt
//         }));

//         res.json({
//             success: true,
//             enrolledStudents
//         });

//     } catch (error) {
//         res.json({
//             success: false,
//             message: error.message
//         });
//     }
// };



import { v2 as cloudinary } from "cloudinary";
import Course from "../models/Course.js";
import { Purchase } from "../models/Purchase.js";
import User from "../models/User.js";
import { clerkClient } from "@clerk/express";
import { request } from "express";

// ✅ Update Role to Educator
export const updateRoleToEducator = async (req, res) => {
  try {
    const userId = req.auth.userId;

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: { role: "educator" },
    });

    res.json({ success: true, message: "You can publish a course now" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ Add New Course (with PDF Upload Support)
export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    const educatorId = req.auth.userId;

    if (!req.files || !req.files.image) {
      return res.json({ success: false, message: "Thumbnail not attached" });
    }
    console.log(req.files.image)

    const parsedCourseData = JSON.parse(courseData);
    parsedCourseData.educator = educatorId;

    // 🖼️ Upload course thumbnail
    const imageUpload = await cloudinary.uploader.upload(req.files.image[0].path, {
      resource_type: "image",
      folder: "course_thumbnails",
    });

    // 📄 Upload PDF files
    let pdfUrls = [];
    if (req.files.files && req.files.files.length > 0) {
      for (const file of req.files.files) {
        const uploadRes = await cloudinary.uploader.upload(file.path, {
          resource_type: "raw",
          folder: "course_pdfs",
        });
        pdfUrls.push(uploadRes.secure_url);
      }
    }

    // 🧾 Create new course
    const newCourse = await Course.create({
      ...parsedCourseData,
      educator: educatorId,
      courseThumbnail: imageUpload.secure_url,
      courseFiles: pdfUrls,
    });

    res.json({ success: true, message: "Course added successfully", newCourse });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Educator Courses
export const getEducatorCourses = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ Educator Dashboard Data
export const educatorDashboardData = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    const totalCourses = courses.length;
    const courseIds = courses.map((course) => course._id);

    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    });

    const totalEarnings = purchases.reduce((sum, p) => sum + p.amount, 0);

    const enrolledStudentsData = [];
    for (const course of courses) {
      const students = await User.find(
        { _id: { $in: course.enrolledStudents } },
        "name imageUrl"
      );
      students.forEach((student) => {
        enrolledStudentsData.push({
          courseTitle: course.courseTitle,
          student,
        });
      });
    }

    res.json({
      success: true,
      dashboardData: { totalEarnings, enrolledStudentsData, totalCourses },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get Enrolled Students
export const getEnrolledStudentsData = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    const courseIds = courses.map((c) => c._id);

    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    })
      .populate("userId", "name imageUrl")
      .populate("courseId", "courseTitle");

    const enrolledStudents = purchases.map((p) => ({
      student: p.userId,
      courseTitle: p.courseId.courseTitle,
      purchaseDate: p.createdAt,
    }));

    res.json({ success: true, enrolledStudents });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
