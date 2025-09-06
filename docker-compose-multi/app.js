const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection URL from environment variable
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/mydb";

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Define Schema
const UserSchema = new mongoose.Schema({
  name: String,
  role: String
});

// Create Model
const User = mongoose.model("User", UserSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Hello from Node.js + MongoDB via Docker Compose 🚀");
});

// Insert a user
app.post("/users", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

// Get all users
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

