require("../src/db/mongoose");
const { ObjectID } = require("mongodb-legacy");
const Task = require("../src/models/task");

// Task.findByIdAndDelete("63f1480d7fac7e23df4162da")
//     .then((result) => {
//         console.log(result);
//         return Task.countDocuments({ completed: false });
//     })
//     .then((count) => {
//         console.log(count);
//     })
//     .catch((e) => {
//         console.log(e);
//     });

const deleteTaskAndCount = async (id) => {
    const taskDeleted = await Task.findByIdAndDelete(id);

    const count = await Task.countDocuments({ completed: false });
    return count;
};

deleteTaskAndCount("63f3bc2fc3ae52efb0bfa06c")
    .then((count) => {
        console.log(count);
    })
    .catch((e) => {
        console.log(e);
    });
