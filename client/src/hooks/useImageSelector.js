// // client/src/hooks/useImageSelector.js
// import { useState, useRef, useCallback } from "react";

// /**
//  * useImageSelector - reusable hook for image selection
//  */
// export const useImageSelector = () => {
//   const [image, setImage] = useState(null);    // stores selected file
//   const [preview, setPreview] = useState(null); // stores preview URL
//   const inputRef = useRef(null);               // ref to file input

//   // Handle normal file selection
//   const handleChange = useCallback((e) => {
//     const file = e.target.files?.[0];
//     if (file && file.type.startsWith("image/")) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   }, []);

//   // Handle drag & drop
//   const handleDrop = useCallback((e) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files?.[0];
//     if (file && file.type.startsWith("image/")) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   }, []);

//   // Prevent default drag behavior
//   const handleDragOver = useCallback((e) => {
//     e.preventDefault();
//   }, []);

//   // Open file picker programmatically
//   const openPicker = useCallback(() => {
//     inputRef.current?.click();
//   }, []);

//   // Reset image and preview
//   const reset = useCallback(() => {
//     setImage(null);
//     setPreview(null);
//     if (inputRef.current) inputRef.current.value = "";
//   }, []);

//   return {
//     image,
//     preview,
//     inputRef,
//     handleChange,
//     handleDrop,
//     handleDragOver,
//     openPicker,
//     reset,
//   };
// };




import { useRef, useState } from "react";

export const useImageSelector = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const openPicker = () => {
    inputRef.current?.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const reset = () => {
    setImage(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return {
    image,
    preview,
    inputRef,
    openPicker,
    handleChange,
    reset,
  };
};