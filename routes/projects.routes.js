const ProjectModel = require("../models/Projects.model");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {

    const foundProjects = await ProjectModel.find();

    res.status(200).json({message: "Here are the Projects", foundProjects})
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Here is your Error", error });
  }
});

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

router.get("/:projectId", async (req, res) => {
  const {projectId} = req.params;

  try {
    const foundProject = await ProjectModel.findById(projectId);

    res.status(200).json({message: "Here is the Project", foundProject})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Here is your Error", error });
  }

  
})

router.put("/update-project/:projectId", async (req, res) => {
  const {projectId} = req.params;

  const projectToUpdate = {
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
    const updatedProject = await ProjectModel.findByIdAndUpdate(projectId, projectToUpdate, {new: true});

    res.status(200).json({message: "Project Updated Sucessfully", updatedProject})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Here is your Error", error });
  }
})

module.exports = router;
