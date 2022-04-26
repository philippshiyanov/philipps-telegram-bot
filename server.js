const fs = require("fs");
const express = require("express");
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

app.get("/form", (req, res) => {
  res.sendFile(__dirname + "/public/create.html");
});

app.post("/upload", (req, res) => {
  console.log(req.body);
});

app.post("/", (req, res) => {
  console.log(req.body);
  fs.appendFile(
    "items.json",
    JSON.stringify(req.body) + ",\n",
    "utf8",
    (err) => {
      if (err) throw err;
    }
  );
  console.log("file was saved!");

  res.sendFile(__dirname + "/public/create.html");
});
