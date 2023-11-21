const express = require("express");
const router = express.Router();
var { expressjwt } = require("express-jwt");
// validators
const { runValidation } = require("../../validators");
const {
  correctWordValidator,
} = require("../../validators/correctWordValidator");

const { requireSignin, adminMiddleware } = require("../../controllers/auth");

const { testGiven } = require("../../controllers/privateInfo/testGiven");

router.get("/test-given/:slug", requireSignin, testGiven);

module.exports = router;
