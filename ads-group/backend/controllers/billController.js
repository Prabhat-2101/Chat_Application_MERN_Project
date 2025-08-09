const Bill = require('../models/Bill');
const Item = require('../models/Item');
const { v4: uuidv4 } = require('uuid');

const generateBill = async (req, res) => {
  try {
    const { buyer_name, address, mobile_number, items } = req.body;
    const bill_id = `BILL-${Date.now()}-${uuidv4().slice(0, 6)}`;

    let total_amount = 0;
    const billItems = [];

    for (let i of items) {
      const item = await Item.findOne({ item_no: i.item_no });
      if (!item || item.quantity < i.quantity) {
        return res.status(400).json({ message: `Item ${i.item_name} is out of stock or not available.` });
      }

      const total_price = item.sell_price * i.quantity;
      total_amount += total_price;

      billItems.push({
        item_no: item.item_no,
        item_name: item.item_name,
        sell_price: item.sell_price,
        quantity: i.quantity,
        total_price
      });

      // Decrease item quantity in DB
      item.quantity -= i.quantity;
      await item.save();
    }

    const newBill = new Bill({
      bill_id,
      buyer_name,
      address,
      mobile_number,
      items: billItems,
      total_amount
    });

    await newBill.save();
    res.status(201).json({ message: 'Bill generated successfully', bill: newBill });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Optional: Get all bills
const getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find().sort({ timestamp: -1 });
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { generateBill, getAllBills };