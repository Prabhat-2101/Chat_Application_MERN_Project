const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  item_no: { type: String, required: true, unique: true },
  item_name: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  cost_price: { type: Number, required: true },
  sell_price: { type: Number, required: true },
  quantity: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
