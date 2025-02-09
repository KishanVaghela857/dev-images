const express = require('express');
const cors = require('cors');
const { Db } = require('mongodb');
const mongoose = require('mongoose')
const PORT = 8000

const app = express()
app.use(express.json());
app.use(cors());

const usersSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
})

const userModal = mongoose.model("users", usersSchema)

mongoose.connect('mongodb://127.0.0.1:27017/admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('DB connected...')).catch((err) => console.log(err))

app.get('/getUsers', async (req, res) => {
  try {
    console.log("Fetching users from MongoDB...");
    const users = await userModal.find({})
    console.log("Users found:", users);
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`server running ${PORT}`);
})