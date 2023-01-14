"use strict";

/** BUILT-IN MODULES */
// used to require a built-in node module
// const fs = require("fs");

// fs.writeFileSync("notes.txt", "My name is Uzair Mohiuddin. ");
// fs.appendFileSync("notes.txt", "I go to the University of Ottawa.");

/** IMPORTING OWN FILES */
// const add = require("./utils.js"); // relative path to get the file
// const sum = add(5, -2);
// console.log(sum);

// const getNotes = require("./notes.js");
// const notes = getNotes();
// console.log(notes);

/** IMPORTING NPM PACKAGES */
// const validator = require("validator");
// console.log(validator.isEmail("uzair_mohiuddin@hotmail.com"));
// console.log(validator.isEmail("uzair_mohiuddinhotmail.com"));
// console.log(
//     validator.isURL(
//         "https://www.udemy.comasas/course/the-complete-nodejs-developer-course-2/learn/lecture/13728848#content"
//     )
// );
//

/** USER INPUT */
// console.log(process.argv);
// console.log(process.argv[1]); // allows accessing command line arguments
// const command = process.argv[2];

// if (command === "add") {
//     console.log(getNotes());
// } else if (command === "remove") {
//     console.log("Removing note!");
// }

const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes.js");

// customize yargs version
yargs.version("1.1.0");

// add, remove, read, list

// Create add command
yargs.command({
    command: "add",
    describe: "Add a new note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string",
        },
        body: {
            describe: "Note body",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    },
});

// Create remove command
yargs.command({
    command: "remove",
    describe: "Removing a note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        notes.removeNote(argv.title);
        console.log(argv);
    },
});

// Create read command
yargs.command({
    command: "read",
    describe: "Reading a note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        notes.readNote(argv.title);
    },
});

// Listing commands
yargs.command({
    command: "list",
    describe: "Listing out all the notes",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string",
        },
    },
    handler() {
        notes.listNotes();
    },
});

// console.log(yargs.argv);
yargs.parse();
