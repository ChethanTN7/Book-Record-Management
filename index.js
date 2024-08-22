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

// get all the users
app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

// get user by id
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id == id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User dosn't exist",
    });
  }
  return res.status(200).json({
    success: true,
    message: "user found",
    data: user,
  });
});

// creating a new user
app.post("/users", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;
  const user = users.find((each) => each.id === id);
  if (user) {
    return res.status(404).json({
      success: false,
      message: "User already exist",
    });
  }
  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });
  return res.status(201).json({
    success: true,
    message: "User added",
    data: users,
  });
});

// updating the user by id
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const user = users.find((each) => each.id == id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User dosn't exist",
    });
  }
  const updatedUserData = users.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: updatedUserData,
  });
});

// Deleting the user by id
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id == id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User dosn't exist",
    });
  }

  // delete code here ...
});

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This page doesn't exist",
  });
});

app.listen(port, () => {
  console.log(`Server is running at port:${port}`);
});
