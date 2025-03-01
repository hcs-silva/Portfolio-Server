const UserModel = require("../models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authenticateUser = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const allUsers = await UserModel.find();
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "here is the error", error });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const userToCreate = {
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      isAdmin: req.body.isAdmin,
    };

    const createdUser = await UserModel.create(userToCreate);
    res.status(201).json(createdUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "here is the error", error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const foundUser = await UserModel.findOne({ email: req.body.email });
    console.log(foundUser)
    if (foundUser) {
      const validPassword = bcrypt.compareSync(
        req.body.password,
        foundUser.password
      );
      console.log(validPassword)
      if (validPassword) {
        console.log("Password is valid, generating auth token...");
        const data = {
          id: foundUser._id,
          username: foundUser.username,
          email: foundUser.email,
          isAdmin: foundUser.isAdmin,
        };

        const authToken = jwt.sign(data, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "10h",
        });

        res
          .status(200)
          .json({
            message: "Login Successful",
            authToken,
            userId: foundUser.id,
            isAdmin: foundUser.isAdmin
          });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "here is the error", error });
  }
});

router.get("/verify", authenticateUser, async (req, res) => {
  res.status(200).json({ message: "Validation Successful", currentUser: req.payload });
});

module.exports = router;
