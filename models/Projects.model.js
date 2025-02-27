const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    technologies: {type: String, required: true},
    githubLink: {type: String, required: true},
    liveLink: {type: String, required: true},
})

const ProjectModel = model("Project", projectSchema)
module.exports = ProjectModel;