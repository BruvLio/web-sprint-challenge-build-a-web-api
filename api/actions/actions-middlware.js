// add middlewares here related to actions
const Actions = require("./actions-model");

async function validateActionid(req, res, next) {
  const { id } = req.params;
  const action = await Actions.get(id);
  if (action) {
    req.action = action;
    next();
  } else {
    res.status(404).json({
      message: `No action with ${id}`,
    });
  }
}

module.exports = {
  validateActionid,
};
