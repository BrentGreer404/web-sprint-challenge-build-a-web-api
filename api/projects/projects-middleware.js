// add middlewares here related to projects
const Project = require("./projects-model")

async function checkProjectId(req, res, next) {
  const id = await Project.get(req.params.id)
  if (id) {
    req.project = id
    next()
  } else {
    next({ status: 404, message: 'id does not exist'})
  }
}

function checkProject(req, res, next) {
  const project = req.body
  if (project.name && project.description) {
    next()
  } else {
    next({status:400})
  }
}

function checkProjectComplete(req, res, next) {
  const project = req.body
  if (project.completed === true || project.completed === false) {
    next()
  } else {
    next({status:400})
  }
}

module.exports = {
  checkProjectId,
  checkProject,
  checkProjectComplete
}