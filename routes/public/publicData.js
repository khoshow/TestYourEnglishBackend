const express = require("express");
const router = express.Router();

const {
  getPublicUserScore,
} = require("../../controllers/publicInfo/scoresRanking");
const {
  getTotalTestNoCorrectWordIntermediate,
} = require("../../controllers/publicInfo/correctWordIntermediate");
const { getRanking } = require("../../controllers/publicInfo/scoresRanking");

router.get("/get-ranking/:slug", getRanking);
router.get("/get-public-display-user-scores/:username", getPublicUserScore);
router.get(
  "/total-test/correct-word-intermediate",

  getTotalTestNoCorrectWordIntermediate
);
module.exports = router;
