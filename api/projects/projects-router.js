// Write your "projects" router here!
const express = require("express");

const Project = require("./projects-model");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("made it to router");
});

module.exports = router;
