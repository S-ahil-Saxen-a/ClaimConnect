var express = require("express");
var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/claimconnect");

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  claimId: Number,
  pName: String,
  pProvider: String,
  email: String,
  age: Number,
  gender: Number,
  claimLimit: String,
  aadharNo: Number,
  dob: String,
  loc: String,
  phnNo: String,
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("users", userSchema);
