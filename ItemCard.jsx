import React from "react";

const ItemCard = ({ item, onClick }) => {
  const imageSrc = `http://localhost:5000${item.imagePath || item.image}`;

  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
      onClick={() => onClick(imageSrc)}
    >
      <img
        src={imageSrc}
        alt={item.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-1">
        <span
          className={`text-xs inline-block px-2 py-1 rounded-full ${
            item.status === "Found"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {item.status || "Lost"}
        </span>
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="text-gray-600 text-sm">{item.description}</p>
      </div>
    </div>
  );
};

export default ItemCard;
