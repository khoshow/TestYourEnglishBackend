const express = require("express");
const router = express.Router();
const { requireSignin } = require("../controllers/auth");
const {getUserProfile, getUserScore } = require("../controllers/userInfo");
// const {tempPhoto, getTempPhoto} = require("../controllers/temporaryProfile")
// const {forgotPasswordValidator, resetPasswordValidator} = require("../validators/auth")
// // validators
// const { runValidation } = require('../validators');
// const { userSignupValidator, userSigninValidator } = require('../validators/auth');

router.get("/getUserProfile/:user", getUserProfile);
router.get("/get-user-scores/:user", requireSignin, getUserScore);

module.exports = router;
