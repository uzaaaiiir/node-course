require("../src/db/mongoose");
const User = require("../src/models/user");

// 63f18db5e71b753857f052bf

User.findByIdAndUpdate("63f146efbb2a4c0a222b697f", {
    age: 1,
})
    .then((user) => {
        console.log(user);
        return User.countDocuments({ age: 1 });
    })
    .then((result) => {
        console.log(result);
    })
    .catch((e) => {
        console.log(e);
    });
