const express = require('express')
const { checkProjectId, checkProject, checkProjectComplete } = require("./projects-middleware");
const { checkActionId } = require("../actions/actions-middlware")
const Project = require("./projects-model")

const router = express.Router()

router.get("/", (req, res) => {
  Project.get()
  .then((project) =>
    res.send(project)
  )
})

router.get("/:id", checkProjectId, (req, res) => {
  Project.get(req.params.id)
  .then((project) => res.json(project))
})

router.post("/", checkProject, (req, res) => {
  Project.insert(req.body)
  .then((project) => res.json(project))
})

router.put("/:id", checkActionId, checkProject, checkProjectComplete, (req, res) => {
  Project.update(req.params.id, req.body)
  .then((project) => res.json(project))
})

router.delete("/:id", checkProjectId, async (req, res, next) => {
  await Project.remove(req.params.id)
  next()
})

router.get("/:id/actions", async (req, res) => {
  const actions = await Project.getProjectActions(req.params.id) 
  res.send(actions || [])
})


module.exports = router