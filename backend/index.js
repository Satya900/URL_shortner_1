const express = require("express");
const mongoose = require("mongoose")
const urlRoutes = require("./routes/urlRoutes")
const app = express();
require('dotenv').config();

const cors = require('cors');
app.use(cors());

app.use(express.json()); 
app.use('/', urlRoutes);


app.get('/', (req, res)=>{
    res.send("Welcome to the backend of URL shortner")
});
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1); // Exit the app if DB connection fails
  }
}

startServer();



app.listen(process.env.PORT, ()=>{
    console.log('Your app is running on port '+ process.env.PORT);
})