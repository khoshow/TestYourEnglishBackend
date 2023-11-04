const express = require("express");
const router = express.Router();
// const { signup, signin, signout, requireSignin, adminMiddleware, forgotPassword, resetPassword, preSignup, googleLogin} = require('../controllers/auth');
// const {tempPhoto, getTempPhoto} = require("../controllers/temporaryProfile")
// const {forgotPasswordValidator, resetPasswordValidator} = require("../validators/auth")
// // validators
const { runValidation } = require("../validators");
const {
  userSignupValidator,
  userSigninValidator,
} = require("../validators/auth");

const { preSignup, signup, signin, signout } = require("../controllers/auth");
router.post('/signin', userSigninValidator, runValidation, signin);
router.get('/signout', signout);
// router.get("/username-availability/:slug", usernameAvailability)
router.post("/pre-signup", userSignupValidator, runValidation, preSignup);
router.post("/signup", signup);

module.exports = router;
