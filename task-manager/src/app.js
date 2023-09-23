const express = require("express");

// connect to db
require("./db/mongoose"); // ensures the file runs

// routers
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
