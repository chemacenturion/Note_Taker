// create express server
// THIS is a basic setup for EXPRESS
const path = require("path");
const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3001;
const uniqid = require("uniqid")

// The following global variables were taken out to make the delete route work.
// The error was that files needed to be read fresh everytime.
// --
// const dataBase = fs.readFileSync("./db/db.json", "utf-8")
// const data = JSON.parse(dataBase)

// everytime an express server is created the following two items will always be here as a basic setup
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// express.static will take 1 argument which is the name of the folder you choose to make static
app.use(express.static("public"));
// Using express will do two things
// 1. You will create a server so you can basically become your own API
// 2. You will generate HTML content from the backend

// Begin creating route below
app.get("/notes", (req, res) => {
    // this route will generate HTML content
    // console.log request and response to see the different properties
    // console.log(req)
    // consol.log(res)
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// creating route for index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.listen(PORT, () => console.log("listening on PORT: 3001."));

// Make backend routes for API
// app.get /api/notes
app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "./db/db.json"), "utf-8", (err, data) => {
        res.send(JSON.parse(data))
    });
});

// function readNotes() {
//     let notes; 
// }

// to publish new note app.post /api/notes
app.post("/api/notes", (req, res) => {
    // make let variable for new entries
    const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"))
    const {title, text} = req.body;
    if ( title && text ) {
        const newNote = {
            title,
            text,
            id: uniqid (),
        }
        notes.push(newNote);
        let newData = JSON.stringify(notes)
        fs.writeFile("./db/db.json", newData, (err) => {
            if (err) {
                console.log(err);
                return res.json("Error");
            }
            const response = {
                status: "Success",
                body: newNote,
            };
            return res.json(response);
        })
    } else {
        return res.json("Please complete both note title and text field.");
    }

    });

// doesn't matter if it has the same name as long as one is GET, POST, DELETE

// BCs Assisted delete route
// cannot use global variable data because fresh data needs to be read everytime
app.delete("/api/notes/:id", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"))
    let noteId = req.params.id;
    const noteFilter = notes.filter(note => note.id !== noteId);

    fs.writeFileSync("./db/db.json", JSON.stringify(noteFilter));

    res.json(true);
});