const express = require("express");
const path = require("path");
const noteData = require("./db/db.json");

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// setup routes for notes and index page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

// set up port
app.listen("3001", () =>
  console.log("listening to listening at http://localhost:3001")
);
