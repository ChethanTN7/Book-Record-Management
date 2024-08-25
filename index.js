const express = require("express");

const userRouter = require("./routes/users.js");
const bookRouter = require("./routes/books.js");

const app = express();

const port = 8081;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is running",
  });
});

app.use("/users", userRouter);
app.use("/books", bookRouter);

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This page doesn't exist",
  });
});

app.listen(port, () => {
  console.log(`Server is running at port:${port}`);
});
