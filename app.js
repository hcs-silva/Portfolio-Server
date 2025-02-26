// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();
const cors = require("cors");

const allowedOrigins = [
    process.env.ORIGIN || "http://localhost:5173", // Local dev origin
    "https://hernani-silva-dev.netlify.app", // Netlify frontend
  ];
  
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow the specified origins, or if there's no origin (like in Postman), allow it
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const certificationRoutes = require("./routes/certifications.routes");
app.use("/certifications", certificationRoutes);

const projectsRoutes = require("./routes/projects.routes");
app.use("/projects", projectsRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/users", userRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
