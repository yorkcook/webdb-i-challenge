const express = require("express");

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "Coming to you live from the API!" });
});

server.get("/accounts", (req, res) => {
  db("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "No, no, no you don't get to see dem accounts." });
    });
});

server.post("/accounts", (req, res) => {
  const account = req.body;
  db("accounts")
    .insert(account, "id")
    .then(account => {
      res.status(201).json(account);
    })
    .catch(error => {
      res.status(500).json({ message: "You have been....denied!" });
    });
});

server.put("/accounts/:id", (req, res) => {
  const update = req.body;
  db("accounts")
    .where("id", "=", req.params.id)
    .update(update)
    .then(account => {
      res.status(200).json(account);
    })
    .catch(error => {
      res.status(500).json({ message: "You done got smurfed!!" });
    });
});

server.delete("/accounts/:id", (req, res) => {
  db("accounts")
    .where("id", "=", req.params.id)
    .del()
    .then(account => {
      if (account > 0) {
        res.status(200).json(account);
      } else {
        res
          .status(404)
          .json({ message: "There ain't no one here with that id!" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "You done got smurfed!" });
    });
});

module.exports = server;
