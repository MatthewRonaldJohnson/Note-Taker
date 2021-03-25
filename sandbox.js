const fs = require('fs')


const getNotes = async function () {
    const notes = await fs.promises.readFile('./db/db.json', 'utf8');
    console.log(notes)
}

getNotes();