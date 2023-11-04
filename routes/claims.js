var express = require("express");
var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/claimconnect");

var claimSchema = mongoose.Schema({
  title: String,
  details: String,
  amount: Number,
  hospitalName: String,
  insuranceCompanyName: String,
  status: String,
});

claimSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("claims", claimSchema);
