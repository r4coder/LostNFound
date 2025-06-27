import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const PostItem = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    type: "Lost",
    image: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("category", form.category);
    data.append("type", form.type);
    data.append("image", form.image);

    try {
      await axios.post("/items", data);
      alert("Item posted!");
      navigate("/");
    } catch (err) {
      alert("Error: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Post a Lost/Found Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Title" className="w-full p-2 border" onChange={handleChange} />
        <textarea name="description" placeholder="Description" className="w-full p-2 border" onChange={handleChange} />
        <select name="category" className="w-full p-2 border" onChange={handleChange}>
          <option value="">Select Category</option>
          <option value="ID Card">ID Card</option>
          <option value="Electronics">Electronics</option>
          <option value="Accessory">Accessory</option>
        </select>
        <select name="type" className="w-full p-2 border" onChange={handleChange}>
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
        </select>
        <input type="file" onChange={handleFile} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Post</button>
      </form>
    </div>
  );
};

export default PostItem;
