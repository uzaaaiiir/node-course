const express = require("express");
const User = require("../models/user"); // Data Model
const auth = require("../middleware/auth");
const multer = require("multer");
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

// POST request for users [logout]
router.post("/users/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });

        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

// logout of all sessions
router.post("/users/logoutAll", auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

// GET request for users [read user]
router.get("/users/me", auth, async (req, res) => {
    res.send(req.user);
});

// PATCH request for users [update user]
router.patch("/users/me", auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age"];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid Updates!" });
    }

    try {
        updates.forEach((updateField) => {
            req.user[updateField] = req.body[updateField];
        });

        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.status(400).send();
    }
});

// DELETE request for users [delete user]
router.delete("/users/me", auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(500).send();
    }
});

// upload photo
const upload = multer({
    dest: "avatars",
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Please upload an image"));
        }

        cb(undefined, true);
    },
});

router.post("/users/me/avatar", upload.single("avatar"), (req, res) => {
    res.send();
});

module.exports = router;
