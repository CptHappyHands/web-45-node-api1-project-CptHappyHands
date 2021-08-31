// BUILD YOUR SERVER HERE
const express = require("express");

const User = require("./users/model");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({
    message: "hello world",
  });
});

server.post("/api/users", (req, res) => {
  //   res.json("creating a user!");
  const newUser = req.body;
  if (!newUser.name || !newUser.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else {
    User.insert(newUser)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        console.log(err);
        res
          .status(400)
          .json({ message: "Please provide name and bio for the user" });
      });
  }
  //   User.insert(newUser)
  //     .then((user) => {
  //       if (user) {
  //         res.status(201).json(user);
  //       } else {
  //         res
  //           .status(400)
  //           .json({ message: "Please provide name and bio for the user" });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json({
  //         message: "Please provide name and bio for the user",
  //       });
  //     });
});

server.get("/api/users", (req, res) => {
  //   res.json("returns an array of users!");
  User.find(req.params)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

server.get("/api/users/:id", (req, res) => {
  //   res.json("return a user with a specfic ID"),
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "that id does not exist" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

server.delete("/api/users/:id", (req, res) => {
  //   res.json("delete a user");
  User.remove(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: `user ${req.params.id} does not exist` });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

server.put("/api/users/:id", async (req, res) => {
  //   res.json("update a user");
  const { id } = req.params;
  const changes = req.body;
  try {
    if (req.params.id !== id) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    } else {
      const result = await User.update(id, changes);
      res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "The user information could not be modified" });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
