const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  bill_id: { type: String, required: true, unique: true },
  buyer_name: String,
  address: String,
  mobile_number: String,
  items: [
    {
      item_no: String,
      item_name: String,
      sell_price: Number,
      quantity: Number,
      total_price: Number
    }
  ],
  total_amount: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bill', billSchema);
