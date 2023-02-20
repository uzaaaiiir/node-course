const mongoose = require("mongoose");

const connection = "mongodb://127.0.0.1:27017/task-manager-api";
const options = {
    useNewUrlParser: true,
};

mongoose.set("strictQuery", false);
mongoose.connect(connection, options);
