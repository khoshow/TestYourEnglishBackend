const express = require("express");
const router = express.Router();

const {
  getPublicUserScore,
} = require("../../controllers/publicInfo/scoresRanking");
const {
  getTotalTestNoCorrectWordIntermediate,
} = require("../../controllers/publicInfo/correctWordIntermediate");
const { getRanking } = require("../../controllers/publicInfo/scoresRanking");
const {
  getCardMessages,
  getCorrectMessages,
  getWrongMessages,
} = require("../../controllers/publicInfo/cardMessages");

router.get("/get-ranking/:slug", getRanking);
router.get("/get-public-display-user-scores/:username", getPublicUserScore);
router.get(
  "/total-test/correct-word-intermediate",

  getTotalTestNoCorrectWordIntermediate
);

router.get("/get-card-messages", getCardMessages);
router.get("/get-correct-messages", getCorrectMessages);
router.get("/get-wrong-messages", getWrongMessages);

module.exports = router;
