const express = require("express");
const router = express.Router();

const { runValidation } = require("../../validators");
const {
  userSignupValidator,
  userSigninValidator,
} = require("../../validators/auth");
const {
  contactForm,
} = require("../../controllers/queryViaWebsite/contactForm");
const {
  preSignup,
  signup,
  signin,
  signout,
  requireSignin,
} = require("../../controllers/auth");
router.post("/contact-form", contactForm);

module.exports = router;
