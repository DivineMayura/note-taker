
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
app.route('/api/notes')
    .get((req, res) => {

        const data = fs.readFile("./db/db.json", (err) => err ? console.log(err) : null)
        console.log(data);
        res.status(200).json(data)

    })

////////////////////////////////////////////////////////////////

app.get('/notes', (req, res) => {
    res.json(`${req.method} request received to retrieve notes`);
    console.info(`${req.method} request received to retrieve notes`);
});

app.post('/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    const { name, text } = req.body;

    // If all the required parts are present
    if (name && text) {
        // Variable for the object we will save
        const newNote = {
            name,
            text,
            review_id: uuidv4()
        };

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                // Converts string into JSON object
                const parsedNotes = JSON.parse(data);

                // Adds a new review
                parsedNotes.push(newNote);
                fs.writeFile(
                    './db/reviews.json',
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
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);