// Write your "projects" router here!
const express = require("express");

const Projects = require("./projects-model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const projects = await Projects.get();
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const project = await Projects.get(req.params.id);
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

router.get("/:id/actions", async (req, res, next) => {
  try {
    const { id } = req.params;
    const actions = await Projects.getProjectActions(id);
    res.status(200).json(actions);
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
      const newProject = await Projects.insert(req.body);
      res.status(201).json(newProject);
    }
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, completed } = req.body;
    if (!name || !description || !completed) {
      res.status(400).json({
        message: `Bad requst needs name and description`,
      });
    } else {
      const newProject = await Projects.update(id, req.body);
      res.status(201).json(newProject);
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Projects.get(id);
    if (!project) {
      res.status(404).json({
        message: `No project with provided ${id}`,
      });
    } else {
      await Projects.remove(id);
      const projects = await Projects.get();
      res.status(200).json(projects);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
