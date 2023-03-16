const express = require("express");

// connect to db
require("./db/mongoose"); // ensures the file runs

// routers
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

const multer = require("multer");

const upload = multer({
    dest: "images",
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(".pdf")) {
            return cb(new Error("Please upload a pdf"));
        }

        cb(undefined, true);
    },
});

app.post("/upload", upload.single("upload"), (req, res) => {
    res.send();
});

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// start server
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
