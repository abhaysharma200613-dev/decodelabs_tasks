const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Temporary in-memory storage
let users = [];

// GET API
app.get("/", (req, res) => {
    res.json({
        message: "Hey Abhay's Backend API is running successfully!"
    });
});

// GET all users
app.get("/users", (req, res) => {
    res.status(200).json(users);
});

// POST user
app.post("/users", (req, res) => {
    const { name, email } = req.body;

    // Validation
    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: "Name and Email are required"
        });
    }

    const newUser = {
        id: users.length + 1,
        name,
        email
    };

    users.push(newUser);

    res.status(201).json({
        success: true,
        message: "User added successfully",
        data: newUser
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});