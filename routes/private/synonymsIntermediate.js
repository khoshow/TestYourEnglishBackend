const express = require("express");
const router = express.Router();
var { expressjwt } = require("express-jwt");
// validators
const { runValidation } = require("../../validators");
const { correctWordValidator } = require("../../validators/correctWordValidator");
// const { requireSignin } = require("../../controllers/auth/rsignin");
const { requireSignin,adminMiddleware } = require("../../controllers/auth");
const { create, list, getTestNo } = require("../../controllers/categories/synonyms/intermediate/crud")

const {updateScore, getTestData} = require("../../controllers/categories/synonyms/intermediate/scores")

router.post(
  "/synonyms-intermediate",
  // expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  requireSignin,
  adminMiddleware,
  // runValidation,
 
  create
);
router.get("/synonyms-intermediate", list);
router.get("/synonyms-intermediate/:slug", getTestNo)
router.put("/synonyms-intermediate/score-update",requireSignin, updateScore)
router.get("/synonyms-intermediate/user-test-data/:slug", requireSignin, getTestData)
// router.get('/category/:slug', read);
// router.delete('/category/:slug', requireSignin, adminMiddleware, remove);
// router.get('/category-image/image/:slug', photo);
// router.put('/category/update/:slug',runValidation, requireSignin, adminMiddleware, update);

module.exports = router;
