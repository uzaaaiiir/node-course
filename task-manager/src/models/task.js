const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// create Task schema
const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

// middleware
taskSchema.pre("save", async function (next) {
    const task = this;

    console.log("middleware");
    next();
});

// create Task model
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
