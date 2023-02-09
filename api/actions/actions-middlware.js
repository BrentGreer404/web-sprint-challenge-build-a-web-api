// add middlewares here related to actions
const Action = require("./actions-model")

async function checkActionId(req, res, next) {
  const id = await Action.get(req.params.id)
  if (id) {
    req.actionId = id
    next()
  } else {
    next({ status:404, message: "id does not exist"})
  }
}

function checkAction(req, res, next) {
  const action = req.body
  if (action.notes && action.description) {
    req.action = action
    next()
  } else {
    next({status:400})
  }
}

module.exports = {
  checkActionId,
  checkAction
}