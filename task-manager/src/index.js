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

const pet = {
    name: "Anaaya",
};

pet.toJSON = function () {
    console.log(this);

    return this;
};

console.log(JSON.stringify(pet));
