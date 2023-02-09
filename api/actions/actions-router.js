const express = require('express')
const {checkActionId, checkAction} = require("./actions-middlware");
const Action = require("./actions-model")

const router = express.Router()

router.get("/", (req, res) => {
  Action.get()
  .then((act) =>
    res.send(act)
  )
})

router.get("/:id", checkActionId, (req, res) => {
  res.send(req.actionId)
})

router.post("/", checkAction, (req, res) => {
  Action.insert(req.body)
  .then(res.json(req.action))
})

router.put("/:id", checkActionId, checkAction, (req, res) => {
  Action.update(req.params.id, req.action)
  .then(res.json(req.action))
})

router.delete("/:id", checkActionId, async (req, res, next) => {
  await Action.remove(req.params.id)
  next()
})

module.exports = router