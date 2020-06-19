const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");

const { createTodo, readTodos, updateTodo } = require("./todos");

const port = 3009;
const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  fs.readFile("index.html", "utf-8", (error, content) => {
    if (error) throw error;
    res.send(content);
  });
});

app.get("/api/v1/todos", (req, res) => {
  console.log(req.query);
  readTodos((todos) => res.json(todos));
});

app.post("/api/v1/todos", (req, res) => {
  const { title } = req.body;

  createTodo(title);

  res.sendStatus(201);
});

app.put("/api/v1/todos/:id", (req, res) => {
  const { id } = req.params;
  const body = req.body;

  updateTodo(Number(id), body);

  res.sendStatus(204);
});

app.delete("/api/v1/todos", function (req, res) {
  res.send("Got a DELETE request at /user");
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
