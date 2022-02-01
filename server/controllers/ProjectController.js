const projectSchema = require('../models/Project');
const UserSchema = require("../models/User");

/*********** LIST OF PROJECTS */
async function getAllProjects(req, res, next) {
    try {
        const projects = await projectSchema
            .find()
            .populate("founder", "userName")
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
            .populate("founder", "userName")
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
            .populate("founder", "userName")
            .populate("participants", "userName");
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
}

/*********** DELETE PROJECT BY ID */
async function deleteProject(req, res, next) {
    try {
        const result = await projectSchema
            .findByIdAndDelete(req.params.projectId);
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
}

/*********** CREATE PROJECT */
async function createProject(req, res, next) {
    try {
        const user = await UserSchema.findById(req.params.uid);
        if(user) {
            // const {title, founder, participants, type_of_project, technologies, stage_of_project, about_project} = req.body;
    
            const newProject = await projectSchema.create({
                title: req.body.title,
                founder: req.body.founder,
                participants: req.body.participants,
                type_of_project: req.body.type_of_project,
                technologies: req.body.technologies,
                stage_of_project: req.body.stage_of_project,
                about_project: req.body.about_project
            });
            console.log(req.body);
            res.status(200).send(newProject);
        } else {
            //if the id in req.params.uid doesn't exist
            res.status(400).send({ error: "This user doesn't exist." });
        }
    } catch (error) {
        next(error);
    }
}

module.exports = { getProject, 
    getAllProjects, 
    createProject, 
    updateProject, 
    deleteProject };