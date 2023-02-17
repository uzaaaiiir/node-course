// CRUD: Create, Read, Update, and Delete

const { MongoClient, ObjectId } = require("mongodb-legacy");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

const options = {
    useNewUrlParser: true,
};

MongoClient.connect(connectionURL, options, (error, client) => {
    if (error) {
        console.log(error);
        return console.log("Unable to connect to database.");
    }

    const db = client.db(databaseName);

    // INSERT ONE
    db.collection("users").insertOne(
        {
            _id: id,
            name: "Jonas",
            age: 14,
        },
        (error, result) => {
            if (error) {
                return console.log("Unable to insert user.");
            }

            console.log(result);
        }
    );

    // INSERT MANY
    db.collection("users").insertMany(
        [
            {
                name: "Jen",
                age: 28,
            },
            {
                name: "Gabe",
                age: 42,
            },
        ],
        (error, result) => {
            if (error) {
                return console.log("Unable to insert users.");
            }

            console.log(result);
        }
    );

    db.collection("tasks").insertMany(
        [
            {
                description: "Wrote schedule",
                completed: true,
            },
            {
                description: "Completed homework",
                completed: false,
            },
            {
                description: "Washed dishes",
                completed: true,
            },
        ],
        (error, result) => {
            if (error) {
                return console.log("Unable to add tasks.");
            }

            console.log(result);
        }
    );

    // FIND ONE
    db.collection("users").findOne(
        { _id: new ObjectId("63eed7ab01922210dc95d37a") },
        (error, result) => {
            if (error) {
                return console.log("Unable to fetch");
            }
            console.log(result);
        }
    );

    // FIND ALL
    db.collection("users")
        .find({ age: { $gt: 24 } })
        .sort({ length: -1 })
        .toArray((error, users) => {
            console.log(users);
        });
});
