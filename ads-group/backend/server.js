const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const itemRoutes = require('./routes/itemRoutes');
const billRoutes = require('./routes/billRoutes');
const port = process.env.PORT || 5000;

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/items', itemRoutes);
app.use('/api/bills', billRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(port, () => console.log(`Server running on port ${port}`));
}).catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Welcome to the Ads Group API');
});