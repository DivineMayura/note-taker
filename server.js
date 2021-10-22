
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { eyes } = require('./middleware/eyes');
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');

app.use(eyes); //this is my custom middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));
// /////////////////////////////////////////////////
app.get('/api/notes', (req, res) => {

        const data = fs.readFile("./db/db.json", (err) => err ? console.error(err) : null)
        console.log(data, "yeah this is the data BUT FOR SOME REASON IT'S UNDEFINED WHY.");
        res.status(200).json(data)

    })

////////////////////////////////////////////////////////////////

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    const { title, text } = req.body;

    // If all the required parts are present
    if (title && text) {
        // Variable for the object we will save
        const newNote = {
            title,
            text,
            review_id: uuidv4()
        };

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                // Converts string into JSON object
                const parsedNotes = JSON.parse(data);

                // Adds a new note
                parsedNotes.push(newNote);
                fs.writeFile(
                    './db/db.json',
                    JSON.stringify(parsedNotes, null, 4),
                    (writeErr) =>
                        writeErr
                            ? console.error(writeErr)
                            : console.info('Successfully updated notes!')
                );

            }
        });

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.json(response);
    } else {
        res.json('Error in creating new note.');
    }
});


// ///////////////////////////////////////////////////////////////////////
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);