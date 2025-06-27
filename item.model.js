import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Lost", "Found"],
    default: "Lost",
  },
  category: {
    type: String,
    enum: ["Wallet", "Phone", "Bag", "Card"],
    default: "Wallet",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
