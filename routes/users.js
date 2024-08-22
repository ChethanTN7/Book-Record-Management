const express = require("express");
const { users } = require("../data/users.json");

const router = express.Router();

// get all the users
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

// get user by id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const user = users.find((each) => each.id == id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User doesn't exist",
    });
  }

  return res.status(200).json({
    success: true,
    message: "user found",
    data: user,
  });
});

// creating a new user
router.post("/", (req, res) => {
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
router.put("/:id", (req, res) => {
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

  return res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: updatedUserData,
  });
});

// Deleting the user by id
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const user = users.find((each) => each.id == id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User dosn't exist",
    });
  }

  const index = users.indexOf(user);
  users.splice(index, 1);

  return res.status(200).json({
    success: true,
    message: "User deleted",
    data: users,
  });
});

module.exports = router;
