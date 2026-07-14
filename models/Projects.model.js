const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
  title: { type: String, required: true },
  thumbnail: { type: String },
  description: { type: String, required: true },
  technologies: { type: [String], required: true },
  collaborators: {
    type: [
      {
        name: { type: String },
        linkedin: { type: String },
      },
    ],
  },
  status: {
    type: String,
    enum: ["development", "deployed", "planned"],
    required: true,
    default: "development",
  },
  githubLink: { type: String, required: false },
  liveLink: { type: String, required: true },
  date: { type: String },
});

const ProjectModel = model("Project", projectSchema);
module.exports = ProjectModel;
