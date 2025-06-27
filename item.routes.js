import express from 'express';
import multer from 'multer';
import path from 'path';
import Item from '../models/item.model.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// ✅ Clear all items
router.delete('/', async (req, res) => {
  try {
    await Item.deleteMany({});
    res.status(200).json({ message: 'All items cleared from database.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to clear items', error: err });
  }
});

// ✅ Add new item
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, status, category } = req.body;

    const newItem = new Item({
      title,
      description,
      status,
      category,
      image: `/uploads/${req.file.filename}`,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error('Error saving item:', err);
    res.status(500).json({ error: 'Failed to save item' });
  }
});

// ✅ Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

export default router;
