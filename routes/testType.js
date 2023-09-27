const express = require("express");
const router = express.Router();
const { create, list } = require("../controllers/testType");

// validators
const { runValidation } = require("../validators");
const { testTypeCreateValidator } = require("../validators/testType");
// const { requireSignin, adminMiddleware } = require('../controllers/auth');

router.post("/testType", runValidation, testTypeCreateValidator, create);
router.get("/testList", list);
// router.get('/category/:slug', read);
// router.delete('/category/:slug', requireSignin, adminMiddleware, remove);
// router.get('/category-image/image/:slug', photo);
// router.put('/category/update/:slug',runValidation, requireSignin, adminMiddleware, update);

module.exports = router;
