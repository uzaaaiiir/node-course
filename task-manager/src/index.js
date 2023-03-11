const express = require("express");

// connect to db
require("./db/mongoose"); // ensures the file runs

// routers
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// start server
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

const jwt = require("jsonwebtoken");

const myFunction = async () => {
    const token = jwt.sign({ _id: "abd123" }, "thisismynewcourse", {
        expiresIn: "7 days",
    });
    console.log(token);

    const payload = jwt.verify(token, "thisismynewcourse");
    console.log(payload);
};

myFunction();
