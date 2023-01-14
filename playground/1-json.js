const fs = require("fs");

const book = {
    title: "The Psychology of Money",
    author: "Morgan Housel",
};

// Convert JS Object to a JSON String
const bookStr = JSON.stringify(book);
console.log(bookStr);

// Convert JSON String into Object
const bookJson = JSON.parse(bookStr);
console.log(bookJson);

// fs.writeFileSync("1-json.json", JSON.stringify(book));

const book1 = {
    title: "I will teach you to be rich",
    author: "Ramit Sethi",
};

// const dataBuffer = fs.readFileSync("1-json.json");
// const dataJSON = dataBuffer.toString();
// const data = JSON.parse(dataJSON);
// console.log(data.title, data.author);

const personObj = JSON.parse(fs.readFileSync("1-json.json").toString());
personObj.name = "Abdu";
personObj.age = 23;
console.log(JSON.stringify(personObj));

fs.writeFileSync("1-json.json", JSON.stringify(personObj));
