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

router.get("/:id", async (req, res, next) => {
  try {
    const project = await Project.get(req.params.id);
    if (!project) {
      res.status(404).json({
        message: `No project with provided ${req.params.id}`,
      });
    } else {
      res.status(200).json(project);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      res.status(400).json({
        message: `Bad request needs name and description`,
      });
    } else {
      const newProject = await Project.insert(req.body);
      res.status(201).json(newProject);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
