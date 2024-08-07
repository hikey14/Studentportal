const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/student_portal', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Database connection failed:', err));

// Define MongoDB Schema
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    attendance: Number,
    cgpa: Number
});

// Create MongoDB Model
const Student = mongoose.model('Student', studentSchema);

app.use(cors());
app.use(bodyParser.json());

// Get all students
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new student
app.post('/students', async (req, res) => {
    const { name, age, attendance, cgpa } = req.body;
    try {
        const newStudent = new Student({ name, age, attendance, cgpa });
        await newStudent.save();
        res.json(newStudent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
