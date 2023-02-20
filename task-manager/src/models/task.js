const mongoose = require("mongoose");

// create Task model
const Task = mongoose.model("Task", {
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

module.exports = Task;
