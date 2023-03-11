const express = require("express");
const User = require("../models/user"); // Data Model
const auth = require("../middleware/auth");
const router = new express.Router(); // Router

// POST request for users [create User]
router.post("/users", async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();

        const token = await user.generateAuthToken();

        // Only executes when save is fulfilled
        res.status(201).send({ user, token });
    } catch (e) {
        // Executes when save is rejected
        res.status(400).send(e);
    }
});

// POST request for users [login]
router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );
        const token = await user.generateAuthToken();

        res.send({ user, token });
    } catch (e) {
        res.status(400).send();
    }
});

// GET request for users [read user]
router.get("/users/me", auth, async (req, res) => {
    res.send(req.user);
});

router.get("/users/:id", async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);
        !user ? res.status(404).send() : res.status(200).send(user);
    } catch (e) {
        res.status(500).send();
    }
});

// PATCH request for users [update user]
router.patch("/users/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age"];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid Updates!" });
    }

    try {
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, });

        const user = await User.findById(req.params.id);

        updates.forEach((updateField) => {
            user[updateField] = req.body[updateField];
        });

        await user.save();

        !user ? res.status(404).send() : res.send(user);
    } catch (e) {
        res.status(400).send();
    }
});

// DELETE request for users [delete user]
router.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        !user ? res.status(404).send() : res.send(user);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;
