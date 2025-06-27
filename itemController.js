const Item = require("../models/Item");

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch items." });
  }
};

const createItem = async (req, res) => {
  try {
    const { title, description, category, type } = req.body;
    const imageUrl = req.file?.path;

    const item = new Item({
      title,
      description,
      category,
      type,
      imageUrl,
      user: {
        name: req.user.name || req.user.email,
        uid: req.user.uid,
      },
    });

    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: "Failed to post item." });
  }
};

module.exports = { getAllItems, createItem };
