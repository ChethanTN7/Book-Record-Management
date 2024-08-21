const express = require("express");
const { users } = require("./data/users.json");

const app = express();

const port = 8081;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is running",
  });
});

app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This page doesn't exist",
  });
});

app.listen(port, () => {
  console.log(`Server is running at port:${port}`);
});
