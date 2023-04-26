// add middlewares here related to projects

const Projects = require("./projects-model");

async function validateProjectid(req, res, next) {
  const { id } = req.params;
  const project = await Projects.get(id);
  if (project) {
    req.project = project;
    next();
  } else {
    res.status(404).json({
      message: `No project with ${id}`,
    });
  }
}

module.exports = {
  validateProjectid,
};
