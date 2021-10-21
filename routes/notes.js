const notes = require('express').Router();
const {readFromFile, readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) => {
    readFromFile('./db/tips.json').then((data) => res.json(JSON.parse(data)));
});



notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
        };

        readAndAppend(newNote, './db/notes.json');
        res.json('Note successfully added');
    } else {
        res.error('Problem with adding note');
    }
});

module.exports = notes;