const express = require("express");
const router = express.Router();

const { getProject, 
    getAllProjects, 
    createProject, 
    updateProject, 
    deleteProject } = require("../controllers/ProjectController");

router.get('/', getAllProjects);

router.route('/:projectId').get(getProject)
                    .put(updateProject)
                    .delete(deleteProject);

// router.post("/log/:uid", createProject);
// router.post("/log", createProject);

module.exports = router;