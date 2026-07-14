require("dotenv").config();
require("../db");

const mongoose = require("mongoose");
const ProjectModel = require("../models/Projects.model");

const ALLOWED_STATUSES = ["development", "deployed", "planned"];
const DEFAULT_STATUS = "development";

async function backfillProjectStatus() {
  const filter = {
    $or: [
      { status: { $exists: false } },
      { status: null },
      { status: "" },
      { status: { $nin: ALLOWED_STATUSES } },
    ],
  };

  const toUpdateCount = await ProjectModel.countDocuments(filter);

  if (toUpdateCount === 0) {
    console.log("No projects require status backfill.");
    return;
  }

  const result = await ProjectModel.updateMany(filter, {
    $set: { status: DEFAULT_STATUS },
  });

  console.log(`Projects matched: ${result.matchedCount}`);
  console.log(`Projects modified: ${result.modifiedCount}`);
  console.log(`Applied default status: ${DEFAULT_STATUS}`);
}

backfillProjectStatus()
  .catch((error) => {
    console.error("Backfill failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    try {
      await mongoose.connection.close();
    } catch (closeError) {
      console.error("Error closing DB connection:", closeError);
    }
  });
