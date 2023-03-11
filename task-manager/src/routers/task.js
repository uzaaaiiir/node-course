const express = require("express");

// Task data model
const Task = require("../models/task");

// Task router
const router = new express.Router();

// POST request for tasks [create Task]
router.post("/tasks", async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

// GET requests for tasks [read Task]
router.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send();
    }
});

router.get("/tasks/:id", async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id);
        !task ? res.status(404).send() : res.send(task);
    } catch (error) {
        res.status(500).send();
    }
});

// PATCH request for tasks [update task]
router.patch("/tasks/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description", "completed"];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid Updates!" });
    }

    try {
        const task = await Task.findById(req.params.id);

        updates.forEach((updateField) => {
            task[updateField] = req.body[updateField];
        });

        await task.save();

        !task ? res.status(404).send() : res.send(task);
    } catch (e) {
        res.status(400).send();
    }
});

// DELETE request for tasks [delete task]
router.delete("/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        !task ? res.status(404).send() : res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;
