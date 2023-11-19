const express = require("express");
const router = express.Router();
var { expressjwt } = require("express-jwt");
// validators
const { runValidation } = require("../../validators");
const { correctWordValidator } = require("../../validators/correctWordValidator");
// const { requireSignin } = require("../../controllers/auth/rsignin");
const { requireSignin,adminMiddleware } = require("../../controllers/auth");
const { create, list, getTestNo } = require("../../controllers/categories/synonyms/advanced/crud")

const {updateScore, getTestData} = require("../../controllers/categories/synonyms/advanced/scores")

router.post(
  "/synonyms-advanced",
  // expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  requireSignin,
  adminMiddleware,
  runValidation,
  correctWordValidator,
  create
);
router.get("/synonyms-advanced", list);
router.get("/synonyms-advanced/:slug", getTestNo)
router.put("/synonyms-advanced/score-update",requireSignin, updateScore)
router.get("/synonyms-advanced/user-test-data/:slug", requireSignin, getTestData)
// router.get('/category/:slug', read);
// router.delete('/category/:slug', requireSignin, adminMiddleware, remove);
// router.get('/category-image/image/:slug', photo);
// router.put('/category/update/:slug',runValidation, requireSignin, adminMiddleware, update);

module.exports = router;
