// Write your "projects" router here!
const express = require("express");
const { validateProjectid } = require("./projects-middleware");

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

router.get("/:id", validateProjectid, async (req, res, next) => {
  try {
    res.status(200).json(req.project);
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
    const { name, description } = req.body;
    const bodyHasCompletedKey = Object.keys(req.body).includes("completed");
    if (name && description && bodyHasCompletedKey) {
      const updatedProject = await Projects.update(id, req.body);
      res.status(201).json(updatedProject);
    } else {
      res.status(400).json({
        message: `Bad requst needs name, description and completed`,
      });
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", validateProjectid, async (req, res, next) => {
  try {
    await Projects.remove(req.params.id);
    const projects = await Projects.get();
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
