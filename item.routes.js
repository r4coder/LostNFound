import express from 'express';
import multer from 'multer';
import Item from '../models/item.model.js';

const router = express.Router();

// 🔧 Multer Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// ✅ Upload item
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, status, category } = req.body;
    if (!req.file) return res.status(400).json({ error: "Image is required" });

    const newItem = new Item({
      title,
      description,
      status,
      category,
      imagePath: `/uploads/${req.file.filename}`
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: "Failed to save item" });
  }
});

// ✅ Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// ✅ FINAL FIX: Clear all items route
router.delete('/clear', async (req, res) => {
  try {
    console.log("🧹 DELETE /api/items/clear triggered");
    await Item.deleteMany({});
    res.status(200).json({ message: "All items deleted successfully" });
  } catch (err) {
    console.error("❌ Delete error:", err);
    res.status(500).json({ message: "Failed to clear items", error: err.message });
  }
});

// ✅ Mark item as found
router.patch('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, { status: "Found" }, { new: true });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "Failed to update item" });
  }
});



export default router;
