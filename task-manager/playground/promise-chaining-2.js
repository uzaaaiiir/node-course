require("../src/db/mongoose");
const Task = require("../src/models/task");

Task.findByIdAndDelete("63f1480d7fac7e23df4162da")
    .then((result) => {
        console.log(result);
        return Task.countDocuments({ completed: false });
    })
    .then((count) => {
        console.log(count);
    })
    .catch((e) => {
        console.log(e);
    });
