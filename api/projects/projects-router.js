// Write your "projects" router here!
const express = require("express");

const Project = require("./projects-model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const project = await Project.get();
    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", (req, res) => {
  console.log("GET BY ID");
});

module.exports = router;
