const { CohereClient } = require('cohere-ai');

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./init/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Question = require("./models/Question");
const protect = require('./middlewares/authMiddleware');

dotenv.config();
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY || 'IkFpGEAW6tDEWQz7WQk2exq6DPd117ItK0O4CRL4'
});

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// DB connect
connectDB();



app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user with raw password; password will be hashed automatically
    const user = await User.create({ name, email, password });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Send response with user data and token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (err) {
    console.error("❌ Registration Error:", err.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare entered password with hashed password in DB
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Send user data with token
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (err) {
    console.error("❌ Login Error:", err.message);
    res.status(500).json({ message: 'Login failed' });
  }
});

app.get('/api/user/profile', protect, (req, res) => {
  res.json({
    message: 'Welcome to your profile',
    user: req.user, // user info from token
  });
});






// ----------------------------
// 🟢 CRUD Routes
// ----------------------------

// ✅ CREATE - Add new question
app.post("/api/questions", async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});





// ✅ READ - Get all questions
app.get("/api/questions", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/api/questions/analytics", async (req, res) => {
  try {
    const total = await Question.countDocuments();

    const solvedCount = await Question.countDocuments({ status: "Done" });
    const unsolvedCount = await Question.countDocuments({ status: "To Do" });
    const inProgressCount = await Question.countDocuments({ status: "In Progress" });

    const statusStats = [
      { _id: "To Do", count: unsolvedCount },
      { _id: "In Progress", count: inProgressCount },
      { _id: "Done", count: solvedCount },
    ];

    const difficultyStats = await Question.aggregate([
      { $group: { _id: "$difficulty", count: { $sum: 1 } } }
    ]);

    res.json({
      total,
      statusStats,
      difficultyStats,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Company-based questions route
app.get('/api/tests/:company', async (req, res) => {
  try {
    const companyName = req.params.company;
    const questions = await Question.find({ company: companyName });
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});






// ✅ UPDATE - Edit a question by ID
app.put("/api/questions/:id", async (req, res) => {
  try {
    const updated = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// ✅ READ - Get a single question by ID
app.get("/api/questions/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.json(question);
  } catch (error) {
    // Catch invalid ObjectId error too
    res.status(400).json({ error: "Invalid ID format or other error" });
  }
});


// ✅ DELETE - Remove a question by ID
app.delete("/api/questions/:id", async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Interview Question Tracker API");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
