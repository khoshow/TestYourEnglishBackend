const express = require("express");
const router = express.Router();

const { requireSignin } = require("../controllers/auth");
// const { getUserScore } = require("../controllers/userInfo");
const {
  profileUpdateStatus,
  profileUpdateMessage,
  profileUpdateName,
  profileUpdateUsername,
  profileUpdateSex,
  profileUpdateDob,
  profileUpdateCountry,
  profileUpdateState,
  profileUpdateAbout,
  profileUpdatePhoto,
} = require("../controllers/profile");
// const {tempPhoto, getTempPhoto} = require("../controllers/temporaryProfile")
// const {forgotPasswordValidator, resetPasswordValidator} = require("../validators/auth")
// // validators
// const { runValidation } = require('../validators');
// const { userSignupValidator, userSigninValidator } = require('../validators/auth');

router.put("/profile-update/status", requireSignin, profileUpdateStatus);
router.put("/profile-update/message", requireSignin, profileUpdateMessage);
router.put("/profile-update/name", requireSignin, profileUpdateName);
router.put("/profile-update/username", requireSignin, profileUpdateUsername);
router.put("/profile-update/sex", requireSignin, profileUpdateSex);
router.put("/profile-update/dob", requireSignin, profileUpdateDob);
router.put("/profile-update/country", requireSignin, profileUpdateCountry);
router.put("/profile-update/state", requireSignin, profileUpdateState);
router.put("/profile-update/about", requireSignin, profileUpdateAbout);
router.put(
  "/profile-update/photo",
  requireSignin,

  profileUpdatePhoto
);

module.exports = router;
