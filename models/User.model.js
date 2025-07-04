const { Schema, model } = require("mongoose");


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
