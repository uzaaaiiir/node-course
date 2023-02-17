// CRUD: Create, Read, Update, and Delete

const { MongoClient, ObjectId } = require("mongodb-legacy");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
    connectionURL,
    { useNewUrlParser: true },
    (error, client) => {
        if (error) {
            console.log(error);
            return console.log("Unable to connect to database.");
        }

        const db = client.db(databaseName);
        const users = db.collection("users");
        const tasks = db.collection("tasks");

        users
            .deleteMany({ age: 24 })
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });

        tasks
            .deleteOne({ description: "Wrote schedule" })
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
    }
);
