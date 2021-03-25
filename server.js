const express = require('express');
const path = require('path');
const fs = require('fs');
const { isArray } = require('util');

const app = express();
const PORT = process.env.PORT || 3000;

let notes; //gets notes from db.json and stores in notes variable 
(async function getNotes() {
    const data = await fs.promises.readFile('./db/db.json', 'utf8');
    notes = JSON.parse(data)
}())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public', 'notes.html'))); //sends browser to the notes html page

app.get('/api/notes', async (req, res) => {
    res.json(notes)
})

app.post('/api/notes', async (req, res) => {
    const newNote = req.body;
    console.log(newNote)
    notes.push(newNote);
    await fs.promises.writeFile('./db/db.json', JSON.stringify(notes))
    res.end
})

app.listen(PORT, () => console.log("Listening on port: " + PORT));