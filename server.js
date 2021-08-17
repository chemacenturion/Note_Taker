// create express server
// THIS is a basic setup for EXPRESS
const path = require("path");
const express = require("express");

const app = express();
const PORT = 3001;
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
// to publish new note app.post /api/notes
// doesn't matter if it has the same name as long as one is GET, POST, DELETE