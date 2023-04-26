const express = require("express");
const server = express();
const projectRouter = require("./projects/projects-router");

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use(express.json());

server.get("/api/projects", (req, res) => {
  res.json("Server.Get for Projects connected");
});

module.exports = server;
