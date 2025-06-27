import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import axios from "../utils/axios";

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("/items")
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(item => (
        <ItemCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default Home;
