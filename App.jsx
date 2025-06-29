import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import UploadModal from "./components/UploadModal";
import ImageZoomModal from "./components/ImageZoomModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";

function App() {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const { user } = useAuth();

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/items");
      setItems(res.data);
    } catch (err) {
      toast.error("Failed to fetch items");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleUploadSuccess = () => {
    toast.success("Item posted successfully!");
    setShowModal(false);
    fetchItems();
  };

  const handleClearItems = async () => {
    const confirmClear = window.confirm("Are you sure you want to delete all items?");
    if (!confirmClear) return;

    try {
      await axios.delete("http://localhost:5000/api/items/clear");
      toast.success("All items cleared!");
      fetchItems();
    } catch (err) {
      toast.error("Failed to clear items");
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" || item.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-6">
      <div className="max-w-5xl mx-auto">
        <Navbar onPostClick={() => setShowModal(true)} />

        {user && (
          <div className="flex gap-3 flex-wrap items-center mt-4 mb-6">
            <input
              type="text"
              placeholder="Search items..."
              className="px-3 py-2 border border-gray-300 rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="All">All Categories</option>
              <option value="Wallet">Wallet</option>
              <option value="Phone">Phone</option>
              <option value="Bag">Bag</option>
              <option value="Card">ID Card</option>
            </select>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              onClick={handleClearItems}
            >
              🗑️ Clear All
            </button>
          </div>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item._id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={`http://localhost:5000${item.imagePath || item.image}`}
                alt={item.title}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() =>
                  setZoomImage(`http://localhost:5000${item.imagePath || item.image}`)
                }
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
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <UploadModal
            onClose={() => setShowModal(false)}
            onUploadSuccess={handleUploadSuccess}
          />
        )}
      </AnimatePresence>

      <ImageZoomModal
        imageUrl={zoomImage}
        onClose={() => setZoomImage(null)}
      />
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
