// backend/controllers/itemController.js
const Item = require('../models/Item');

// Add a new item
const addItem = async (req, res) => {
  try {
    const {
      item_no, item_name, category, subcategory,
      cost_price, sell_price, quantity
    } = req.body;

    const existing = await Item.findOne({ item_no });
    if (existing) {
      return res.status(400).json({ message: 'Item with this item_no already exists' });
    }

    const newItem = new Item({
      item_no, item_name, category, subcategory,
      cost_price, sell_price, quantity
    });

    await newItem.save();
    res.status(201).json({ message: 'Item added successfully', item: newItem });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all items
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ item_name: 1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { addItem, getAllItems };
