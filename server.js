const url = require("url");
const http = require("http");
const { readTodos, createTodo } = require("./todos");

// console log
const logger = (request, response) => {
  const { pathname, query } = url.parse(request.url, true);

  console.table([
    {
      METHOD: request.method,
      PATHNAME: pathname,
      QUERY: JSON.stringify(query),
    },
  ]);
};

// todos api
const todos = (request, response) => {
  const { pathname, query } = url.parse(request.url, true);
  if (pathname === "/todos") {
    switch (request.method) {
      case "GET":
        response.setHeader("Content-Type", "application/json");

        readTodos((todos) => {
          response.end(JSON.stringify(todos));
        });
        break;
      case "POST":
        let rawData = "";
        request.on("data", (chunk) => (rawData += chunk));
        request.on("end", () => {
          try {
            const { title } = JSON.parse(rawData);

            createTodo(title);

            response.writeHead(201, { "Content-Type": "text/plain" });
            response.end("Задача создана");
          } catch (error) {
            console.log(error);
          }
        });
        break;

      default:
        break;
    }
  }
};

// create server
const server = http.createServer((request, response) => {
  logger(request, response);
  todos(request, response);
});

// start listen port 3009
server.listen(3009);
