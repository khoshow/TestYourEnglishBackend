const express = require("express");
const router = express.Router();
const { requireSignin } = require("../controllers/auth");
const { getUserProfile, getUserScoreCorrectWordIntermediate } = require("../controllers/userInfo/getProfile");
// const {tempPhoto, getTempPhoto} = require("../controllers/temporaryProfile")
// const {forgotPasswordValidator, resetPasswordValidator} = require("../validators/auth")
// // validators
// const { runValidation } = require('../validators');
// const { userSignupValidator, userSigninValidator } = require('../validators/auth');

router.get("/getUserProfile/:user", getUserProfile);


module.exports = router;
