const express = require('express');
const router = express.Router();
const { requireSignin} = require('../controllers/auth');
const {getRanking} = require("../controllers/ranking")

// router.get('/get-ranking/:slug', getRanking);


module.exports = router;
