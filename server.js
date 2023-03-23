const express = require("express");
const path = require("path");
const noteData = require("./db/db.json");
const fs = require("fs");

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

// setup api routes
app.get("/api/notes", (req, res) => {
  res.status(200).json(noteData);
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      return JSON.parse(data);
    }
  });
  // res.json(`${req.method} was recieved`);
  // console.info(req.rawHeaders);
  // console.info(`${req.method} request received`);
});

app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;

  const newNote = {
    title: title,
    text: text,
  };

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

  // res.json(`${req.method} was recieved`);
  // console.info(req.rawHeaders);
  // console.info(`${req.method} request received`);
});

// set up port
app.listen("3001", () =>
  console.log("listening to listening at http://localhost:3001")
);
