const express = require("express");
const router = express.Router();
var { expressjwt } = require("express-jwt");
// validators
const { runValidation } = require("../../validators");
const { correctWordValidator } = require("../../validators/correctWordValidator");
// const { requireSignin } = require("../controllers/auth/rsignin");
const { requireSignin, adminMiddleware } = require("../../controllers/auth");
const { create, list, getTestNo } = require("../../controllers/categories/correctMeaning/advanced/crud")

const {updateScore, getTestData} = require("../../controllers/categories/correctMeaning/advanced/scores")

router.post(
  "/correct-meaning-advanced",
  // expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  requireSignin,
  adminMiddleware,
 
  correctWordValidator,
  create
);
router.get("/correct-meaning-advanced", list);
router.get("/correct-meaning-advanced/:slug", getTestNo);
router.put(
  "/correct-meaning-advanced/score-update",
  requireSignin,
  updateScore
);
router.get(
  "/correct-meaning-advanced/user-test-data/:slug",
  requireSignin,
  getTestData
);
// router.get('/category/:slug', read);
// router.delete('/category/:slug', requireSignin, adminMiddleware, remove);
// router.get('/category-image/image/:slug', photo);
// router.put('/category/update/:slug',runValidation, requireSignin, adminMiddleware, update);

module.exports = router;
