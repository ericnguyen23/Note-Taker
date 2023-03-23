const express = require("express");
const path = require("path");
let noteData = require("./db/db.json");
const fs = require("fs");
const generateUniqueId = require("generate-unique-id");

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// setup routes for notes and index page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

// api get routes
app.get("/api/notes", (req, res) => {
  res.json(noteData);
});

// api post route
app.post("/api/notes", (req, res) => {
  const { title, text, id } = req.body;

  const newNote = {
    title: title,
    text: text,
    id: generateUniqueId(),
  };

  // add note the the front end
  noteData.push(newNote);
  res.json("Added!");

  // write to the local db
  fs.writeFile("./db/db.json", JSON.stringify(noteData, null, 4), (err) =>
    err ? console.log(err) : console.log(`data written succesully`)
  );
});

// delete route
app.delete("/api/notes/:id", (req, res) => {
  const { id } = req.body;

  // delete note from the front end
  // noteData.filter((note) => note.id != id);

  // delete note from the front end
  const index = noteData.findIndex((note) => note.id === id);
  noteData.splice(index, 1);

  // delete note from db
  fs.writeFile("./db/db.json", JSON.stringify(noteData, null, 4), (err) =>
    err ? console.log(err) : res.json("Deleted!")
  );
});

// set up port
app.listen("3001", () =>
  console.log("listening to listening at http://localhost:3001")
);
