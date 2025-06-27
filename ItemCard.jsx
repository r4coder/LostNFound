import React from "react";

const ItemCard = ({ item, onMarkAsFound, onImageClick }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <img
        src={`http://localhost:5000/${item.image}`}
        alt={item.title}
        className="w-full h-48 object-cover cursor-pointer"
        onClick={() => onImageClick(`http://localhost:5000/${item.image}`)}
      />

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
        <p className="text-gray-600 mt-1">{item.description}</p>

        <div className="mt-4 flex justify-between items-center">
          <span
            className={`px-2 py-1 text-xs font-bold rounded ${
              item.status === "found"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {item.status.toUpperCase()}
          </span>

          {item.status === "lost" && (
            <button
              onClick={() => onMarkAsFound(item._id)}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
            >
              Mark as Found
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
