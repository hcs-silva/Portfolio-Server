const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
    title: {type: String, required: true},
    thumbnail: {type: String},
    description: {type: String, required: true},
    technologies: {type: [String], required: true},
    collaborators: {type: [String]},
    githubLink: {type: String, required: true},
    liveLink: {type: String, required: true},
    date: {type: String}
})

const ProjectModel = model("Project", projectSchema)
module.exports = ProjectModel;
