const mongoose = require("mongoose");
const config = require('../config')
const jwt = require('jsonwebtoken')
var UserSchema = new mongoose.Schema({
  Username: {
    type: String,
    default: "",
  },
  Password: {
    type: String,
    default: ""
  },
  CreatedOnUTC: {
    type: Date,
    default: Date.now
  }
});
UserSchema.methods.generateAuthToken = function () {
  console.log("auth token")
  const token = jwt.sign({
    _id: this._id,
    Username: this.Username
  }, config.secret, {
    expiresIn: "60m"
  })
  return token
}
UserSchema.methods.generatePermAuthToken = function () {
    console.log("auth token")
    const token = jwt.sign({
      _id: this._id,
      Username: this.Username
    }, config.secret)
    return token
  }

module.exports = mongoose.model("User", UserSchema);
