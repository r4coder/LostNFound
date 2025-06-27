import React from "react";

const ImageZoomModal = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
      onClick={onClose}
    >
      <img
        src={imageUrl}
        alt="Zoomed"
        className="max-w-[90vw] max-h-[90vh] rounded-lg border-4 border-white shadow-2xl"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
      />
    </div>
  );
};

export default ImageZoomModal;
