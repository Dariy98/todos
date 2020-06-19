console.log("Hello");

fetch("http://localhost:3009/api/v1/todos")
  .then((response) => response.json())
  .then((todos) => {
    console.log(todos);
  });
