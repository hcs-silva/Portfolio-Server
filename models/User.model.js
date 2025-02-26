const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,    
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  username: {type: String},
  isAdmin: { type: String, required: false, default: false },
});

const UserModel = model("User", userSchema);

module.exports = UserModel;
