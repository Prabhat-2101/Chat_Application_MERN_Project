// backend/routes/billRoutes.js
const express = require('express');
const router = express.Router();
const {
  generateBill,
  getAllBills
} = require('../controllers/billController');

router.post('/generate', generateBill);
router.get('/', getAllBills);

module.exports = router;
