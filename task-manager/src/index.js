const express = require("express");

// connect to db
require("./db/mongoose"); // ensures the file runs

// data models
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// POST request for users [create User]
app.post("/users", async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();

        // Only executes when save is fulfilled
        res.status(201).send(user);
    } catch (e) {
        // Executes when save is rejected
        res.status(400).send(e);
    }
});

// GET request for users [read user]
app.get("/users", async (req, res) => {
    try {
        const users = await User.find({});

        res.send(users);
    } catch (e) {
        res.status(500).send();
    }
});

app.get("/users/:id", async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);
        !user ? res.status(404).send() : res.status(200).send(user);
    } catch (e) {
        res.status(500).send();
    }
});

// PATCH request for users [update user]
app.patch("/users/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age"];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid Updates!" });
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        !user ? res.status(404).send() : res.send(user);
    } catch (e) {
        res.status(400).send();
    }
});

// DELETE request for users [delete user]
app.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        !user ? res.status(404).send() : res.send(user);
    } catch (e) {
        res.status(500).send();
    }
});

// POST request for tasks [create Task]
app.post("/tasks", async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

// GET requests for tasks [read Task]
app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send();
    }
});

app.get("/tasks/:id", async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id);
        !task ? res.status(404).send() : res.send(task);
    } catch (error) {
        res.status(500).send();
    }
});

// PATCH request for tasks [update task]
app.patch("/tasks/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description", "completed"];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid Updates!" });
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        !task ? res.status(404).send() : res.send(task);
    } catch (e) {
        res.status(400).send();
    }
});

// DELETE request for tasks [delete task]
app.delete("/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        !task ? res.status(404).send() : res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});
// start server
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
