require("dotenv").config();
require("../db");

const mongoose = require("mongoose");
const ProjectModel = require("../models/Projects.model");

async function backfillCollaboratorLinkedin() {
  const projects = await ProjectModel.find({
    "collaborators.link": { $exists: true },
  });

  if (projects.length === 0) {
    console.log("No projects require collaborator linkedin backfill.");
    return;
  }

  let modifiedProjects = 0;
  let transformedCollaborators = 0;

  for (const project of projects) {
    let projectChanged = false;

    const collaborators = Array.isArray(project.collaborators)
      ? project.collaborators.map((collaborator) => {
          if (!collaborator || typeof collaborator !== "object") {
            return collaborator;
          }

          if (collaborator.link && !collaborator.linkedin) {
            projectChanged = true;
            transformedCollaborators += 1;

            return {
              name: collaborator.name || "",
              linkedin: collaborator.link,
            };
          }

          if (collaborator.link && collaborator.linkedin) {
            projectChanged = true;

            return {
              name: collaborator.name || "",
              linkedin: collaborator.linkedin,
            };
          }

          return collaborator;
        })
      : [];

    if (projectChanged) {
      project.collaborators = collaborators;
      await project.save();
      modifiedProjects += 1;
    }
  }

  console.log(`Projects scanned: ${projects.length}`);
  console.log(`Projects modified: ${modifiedProjects}`);
  console.log(`Collaborators transformed: ${transformedCollaborators}`);
}

backfillCollaboratorLinkedin()
  .catch((error) => {
    console.error("Collaborator backfill failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    try {
      await mongoose.connection.close();
    } catch (closeError) {
      console.error("Error closing DB connection:", closeError);
    }
  });
