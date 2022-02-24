const projectSchema = require("../models/Project");
const UserSchema = require("../models/User");
const mongoose = require('mongoose');

/*********** LIST OF PROJECTS */
async function getAllProjects(req, res, next) {
  try {
    const projects = await projectSchema
      .find()
      .populate("founder", "firstName")
      .populate("participants", "userName");
    res.status(200).send(projects);
  } catch (error) {
    next(error);
  }
}

/*********** GET PROJECT BY ID */
async function getProject(req, res, next) {
  try {
    const project = await projectSchema
      .findOneById(req.params.projectId)
      .populate("founder", "firstName")
      .populate("participants", "userName");
    if (!project) throw new createError.NotFound();
    res.status(200).send(project);
  } catch (error) {
    next(error);
  }
}

/*********** UPDATE PROJECT BY ID */
async function updateProject(req, res, next) {
  try {
    const result = await projectSchema
      .findByIdAndUpdate(req.params.projectId, req.body)
      .populate("founder", "firstName")
      .populate("participants", "userName");
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
}

/*********** DELETE PROJECT BY ID */
async function deleteProject(req, res, next) {
  try {
    const result = await projectSchema.findByIdAndDelete(req.params.projectId);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
}

/*********** CREATE PROJECT */
async function createProject(req, res, next) {
  // const user = await UserSchema.findById().populate("founder", "firstName");
  // const {title, founder, participants, type_of_project, technologies, stage_of_project, about_project} = req.body;
  // if(user){
  try {
    const newProject = await projectSchema.create({
      title: req.body.title,
      founder: mongoose.Types.ObjectId(req.body.id),
      participants: req.body.participants,
      type_of_project: req.body.type_of_project,
      technologies: req.body.technologies,
      stage_of_project: req.body.stage_of_project,
      about_project: req.body.about_project,
      add_link: req.body.add_link,
      few_words: req.body.few_words,
    });
    console.log(req.body);
    console.log("founder", req.body.founder);
    res.status(200).send(newProject);
  } catch (error) {
    next(error);
  }
// }
}

module.exports = {
  getProject,
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
};
