const express = require("express");
const router = express.Router();
const { create, list } = require("../controllers/correct-word-medium");
var { expressjwt } = require("express-jwt");
// validators
const { runValidation } = require("../validators");
const { correctWordValidator } = require("../validators/correctWordValidator");
// const { requireSignin } = require("../controllers/auth/rsignin");
const { requireSignin,adminMiddleware } = require("../controllers/auth");

router.post(
  "/correct-word-medium",
  // expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  requireSignin,
  adminMiddleware,
  runValidation,
  correctWordValidator,
  create
);
router.get("/correct-words-medium", list);
// router.get('/category/:slug', read);
// router.delete('/category/:slug', requireSignin, adminMiddleware, remove);
// router.get('/category-image/image/:slug', photo);
// router.put('/category/update/:slug',runValidation, requireSignin, adminMiddleware, update);

module.exports = router;
