"use strict";

const fs = require("fs");
const chalk = require("chalk");

// Add Note to JSON file
const addNote = function (title, body) {
    const notes = loadNotes();
    console.log(notes);

    // const duplicateNotes = notes.filter((note) => note.title === title);
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body,
        });

        saveNotes(notes);
        console.log(chalk.green.inverse("New note added!"));
    } else {
        console.log(chalk.red.inverse("Note title taken!"));
    }
};

// Remove note from JSON file
const removeNote = function (title) {
    const notes = loadNotes();

    const notesFiltered = notes.filter((note) => note.title !== title);

    if (notes.length > notesFiltered.length) {
        saveNotes(notesFiltered);
        console.log(chalk.bgGreen("Note removed."));
    } else {
        console.log(chalk.bgRed("No note found!."));
    }
};

// List all Notes
const listNotes = function () {
    const notes = loadNotes();

    console.log(chalk.inverse("Your notes"));

    notes.forEach((note) => {
        console.log(note.title.padEnd(15, " ") + ": " + note.body);
    });
};

const readNote = function (title) {
    const notes = loadNotes();

    const noteFound = notes.find((note) => note.title === title);

    if (noteFound) {
        console.log(chalk.inverse(noteFound.title));
        console.log(noteFound.body);
    } else {
        console.log(chalk.red.inverse("No note found!"));
    }
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync("notes.json").toString();
        return JSON.parse(dataBuffer);
    } catch (e) {
        return [];
    }
};

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
};
