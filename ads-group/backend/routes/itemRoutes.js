const express = require('express');
const router = express.Router();
const {
  addItem,
  getAllItems
} = require('../controllers/itemController');

router.post('/add', addItem);
router.get('/', getAllItems);

module.exports = router;