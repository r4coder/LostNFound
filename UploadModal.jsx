import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const UploadModal = ({ onClose, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Lost");
  const [category, setCategory] = useState("Wallet");

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  const handleSubmit = async () => {
    if (!file || !title || !description) {
      toast.error("Please fill all fields and select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("status", status);
    formData.append("category", category);

    try {
      await axios.post("http://localhost:5000/api/items", formData);
      onUploadSuccess();
    } catch (err) {
      toast.error("Upload failed");
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-xl p-6 w-full max-w-md space-y-4 relative"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-gray-700">Post Lost Item</h2>

        <input
          type="text"
          placeholder="Item Title"
          className="w-full border px-3 py-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full border px-3 py-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="Wallet">Wallet</option>
          <option value="Phone">Phone</option>
          <option value="Bag">Bag</option>
          <option value="Card">ID Card</option>
        </select>

        <div
          {...getRootProps()}
          className={`border-2 p-6 text-center rounded-lg cursor-pointer ${
            isDragActive ? "border-blue-500 bg-blue-50" : "border-dashed border-gray-400"
          }`}
        >
          <input {...getInputProps()} />
          <FaCloudUploadAlt size={40} className="mx-auto mb-2 text-blue-600" />
          <p className="text-sm">{file ? file.name : "Drag and drop an image or click to upload"}</p>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Post
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UploadModal;
