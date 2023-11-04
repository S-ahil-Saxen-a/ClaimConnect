var express = require("express");
var router = express.Router();
const passport = require("passport");
const userModel = require("./users");
const claimModel = require("./claims");
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/hospitals", function (req, res, next) {
  res.render("hospitalsList", { title: "Express" });
});

router.get("/patient", async function (req, res, next) {
  // const count = await claimModel.collection.count();
  const sum_pc = await claimModel.aggregate([
    {
      $match: { status: "pending" },
    },
    {
      $group: {
        _id: null,
        sum: { $sum: "$amount" },
      },
    },
  ]);
  var total_pc = 0;
  if (sum_pc.length > 0) {
    console.log(sum_pc[0].sum);
    total_pc = sum_pc[0].sum;
  }
  const sum_rc = await claimModel.aggregate([
    {
      $match: { status: "reverted" },
    },
    {
      $group: {
        _id: null,
        sum: { $sum: "$amount" },
      },
    },
  ]);
  var total_rc = 0;
  if (sum_rc.length > 0) {
    console.log(sum_rc[0].sum);
    total_rc = sum_rc[0].sum;
  }
  // claimModel.find({ status: "pending" }).then(function (allClaims) {
  //   console.log(allClaims);
  //   res.render("patient", { allClaims, totalAmt });
  // });
  const pendingClaims = await claimModel.find({status: "pending"})
  const revertedClaims = await claimModel.find({status: "reverted"})
  res.render("patient", {pendingClaims, revertedClaims, total_pc, total_rc});
});

router.get("/patient/proceedClaim", async function (req, res, next) {
  await claimModel.updateMany({}, { $set: { status: "resolved" } });
  res.redirect("/patient");
});

router.post("/createClaim", async function (req, res, next) {
  console.log(req.body);
  claimModel.insertMany(req.body);
  // res.redirect("/hospitalDb_pat");
  res.json({ suucess: true, message: req.body });
  // claimModel
  //   .create({
  //     title: req.body.claimname,
  //     details: req.body.claimdes,
  //     amount: req.body.amount,
  //   })
  //   .then(async function (createUser) {
  //     res.redirect("/hospitalDb_pat");
  //   });
});

router.get("/cancelClaimReq", async function (req, res, next) {
  await claimModel.deleteMany({});
  res.redirect("/patient");
});

router.get("/hospitalDb", function (req, res, next) {
  res.render("hospitalDb", { title: "Express" });
});

router.get("/hospitalDb_pat", async function (req, res, next) {
  // const claimData = await claimModel.find({});
  // console.log(claimData)
  res.render("hospitalDb_pat", { title: "Express" });
});

router.get("/insuranceDb", function (req, res, next) {
  res.render("insuranceDb", { title: "Express" });
});

router.get("/insuranceDb_clm", async function (req, res, next) {
  const sum = await claimModel.aggregate([
    {
      $match: { status: "resolved" },
    },
    {
      $group: {
        _id: null,
        sum: { $sum: "$amount" },
      },
    },
  ]);
  var totalAmt = 0;
  if (sum.length > 0) {
    totalAmt = sum[0].sum;
  }
  claimModel.find({ status: "resolved" }).then(function (allClaims) {
    res.render("insuranceDb_clm", { allClaims, totalAmt });
  });
});

router.get("/insuranceDb_clm/approve/:id", async function (req, res, next) {
  console.log(req.params.id);
  let doc = await claimModel.findOneAndUpdate(
    { _id: req.params.id },
    { status: "approved" }
  );
  console.log(doc);
  res.redirect("/insuranceDb_clm");
});

router.post("/insuranceDb_clm/revert/:id", async function (req, res, next) {
  // console.log(req.params.id);
  // console.log(req.body);
  res.json({ suucess: true, message: req.body });
  // let doc = await claimModel.findOneAndUpdate(
  //   { _id: req.params.id },
  //   { status: "reverted" }
  // );
  // console.log(doc);
  // res.redirect("/insuranceDb_clm");
});

/* GET login page. */
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/patient",
    failureRedirect: "/",
  }),
  function (req, res, next) {}
);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
}

module.exports = router;
