import { useEffect, useState } from "react";
import axios from "axios";
import ItemCard from "../components/ItemCard";
import ItemZoomModal from "../components/ItemZoomModal";

const Home = () => {
  const [items, setItems] = useState([]);
  const [zoomImage, setZoomImage] = useState(null);

  // ✅ Fetch items from backend
  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/items");
      setItems(res.data);
    } catch (err) {
      console.error("❌ Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // ✅ Clear All Items
  const handleClearAll = async () => {
    try {
      const confirmClear = window.confirm("Are you sure you want to delete all items?");
      if (!confirmClear) return;

      // Make sure this matches backend route!
      const res = await axios.delete("http://localhost:5000/api/items");
      console.log("✅ Deleted:", res.data);
      setItems([]);
    } catch (err) {
      console.error("❌ Clear failed:", err.response?.data || err.message);
      alert("Failed to clear items");
    }
  };

  // ✅ Zoom image modal
  const handleImageClick = (url) => setZoomImage(url);

  // ✅ Mark as Found
  const handleMarkAsFound = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/items/${id}`, {
        status: "Found"
      });

      setItems(prev =>
        prev.map(item =>
          item._id === id ? { ...item, status: "Found" } : item
        )
      );
    } catch (err) {
      console.error("❌ Failed to update item:", err);
    }
  };

  return (
    <>
      <div className="flex justify-end p-4">
        <button
          onClick={handleClearAll}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Clear All Items
        </button>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onImageClick={handleImageClick}
            onMarkAsFound={handleMarkAsFound}
          />
        ))}
      </div>

      {zoomImage && (
        <ItemZoomModal imageUrl={zoomImage} onClose={() => setZoomImage(null)} />
      )}
    </>
  );
};

export default Home;
