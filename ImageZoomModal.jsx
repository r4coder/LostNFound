import React from "react";
import { motion } from "framer-motion";

const ImageZoomModal = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.img
        src={imageUrl}
        alt="Zoomed"
        className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg border-4 border-white"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

export default ImageZoomModal;
