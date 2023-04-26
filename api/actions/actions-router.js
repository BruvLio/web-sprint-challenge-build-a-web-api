// Write your "actions" router here!

const express = require("express");
const { validateActionid } = require("./actions-middlware");

const Actions = require("./actions-model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const actions = await Actions.get();
    res.status(200).json(actions);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const action = await Actions.get(id);
    if (!action) {
      res.status(404).json({
        message: `No action with provided ${id}`,
      });
    } else {
      res.status(200).json(action);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { notes, description, project_id } = req.body;
    if (!notes || !description || !project_id) {
      res.status(400).json({
        message: `Bad request needs notes, descrioption and project_id`,
      });
    } else {
      const newAction = await Actions.insert(req.body);
      res.status(201).json(newAction);
    }
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { notes, description, project_id } = req.body;
    if (!notes || !description || !project_id) {
      res.status(400).json({
        message: `Bad request needs notes, descrioption and project_id`,
      });
    } else {
      const newAction = await Actions.update(id, req.body);
      res.status(201).json(newAction);
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", validateActionid, async (req, res, next) => {
  try {
    await Actions.remove(req.params.id);
    const actions = await Actions.get();
    res.status(200).json(actions);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
