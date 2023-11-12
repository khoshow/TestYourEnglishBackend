const express = require("express");
const router = express.Router();

const {
  getPublicUserScore,
} = require("../../controllers/publicInfo/userPublicInfo");
const { getRanking } = require("../../controllers/publicInfo/ranking");

router.get("/get-ranking/:slug", getRanking);
router.get("/get-public-display-user-scores/:user", getPublicUserScore);

module.exports = router;
