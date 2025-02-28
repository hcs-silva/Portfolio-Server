const router = require("express").Router();

router.post("/add-project", async (req, res) => {
    
})

router.get("/projects", async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Here is your Error", error });
  }
});

module.exports = router;
