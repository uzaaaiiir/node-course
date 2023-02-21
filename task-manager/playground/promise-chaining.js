require("../src/db/mongoose");
const User = require("../src/models/user");

// 63f18db5e71b753857f052bf

// Using Promise Chaining to Update User and get Count
// User.findByIdAndUpdate("63f146efbb2a4c0a222b697f", {
//     age: 1,
// })
//     .then((user) => {
//         console.log(user);
//         return User.countDocuments({ age: 1 });
//     })
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((e) => {
//         console.log(e);
//     });

/**
 * Using ASYNC AWAIT as alternative to Promise Chaining
 */
const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age });
    return count;
};

updateAgeAndCount("63f146efbb2a4c0a222b697f", 2)
    .then((count) => {
        console.log(count);
    })
    .catch((e) => {
        console.log(e);
    });
