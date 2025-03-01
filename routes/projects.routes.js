const ProjectModel = require("../models/Projects.model");

const router = require("express").Router();

router.post("/", async (req, res) => {
  const projectToAdd = {
    title: req.body.title,
    thumbnail: req.body.thumbnail,
    collaborators: req.body.collaborators,
    technologies: req.body.technologies,
    githubLink: req.body.githubLink,
    liveLink: req.body.liveLink,
    description: req.body.description,
    date: req.body.date
  };

  try {
    const addedProject = ProjectModel.create(projectToAdd);
    res
      .status(200)
      .json({ message: "Project Added Sucessfully", addedProject });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Here is your Error", error });
  }
});

router.get("/projects", async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Here is your Error", error });
  }
});

module.exports = router;
