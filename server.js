const express = require("express");
const path = require("path");
const noteData = require("./db/db.json");
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
  const { title, text, note_id } = req.body;

  const newNote = {
    title: title,
    text: text,
    note_id: generateUniqueId(),
  };

  noteData.push(newNote);
  res.json("Added!");

  // write to the local db
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(newNote);
      fs.writeFile("./db/db.json", JSON.stringify(parsedData, null, 4), (err) =>
        err ? console.log(err) : console.log(`data written succesully`)
      );
    }
  });
});

// set up port
app.listen("3001", () =>
  console.log("listening to listening at http://localhost:3001")
);
