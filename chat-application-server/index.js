const express = require('express');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
const userRoutes = require('./Routes/userRoute.js')
const app = express();
var cors = require('cors');
const server = require('http').createServer(app);

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.log(err);
  }
}

app.get('/',(req,res)=>{
    res.send('Hello World');
})
app.use("/user",userRoutes);
connectDB();

const port = process.env.port || 3000;
server.listen(port, () => console.log('Server is running'));