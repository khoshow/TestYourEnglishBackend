const express = require("express");
const router = express.Router();

const {
  getPublicUserScore,
} = require("../../controllers/publicInfo/scoresRanking");
const {
  getTotalTestNoCorrectWordIntermediate,
} = require("../../controllers/publicInfo/correctWordIntermediate");
const { getRankingCorrectWordIntermediate } = require("../../controllers/publicInfo/scoresRanking");
const {
  getCardMessages,
  getCorrectMessages,
  getWrongMessages,
} = require("../../controllers/publicInfo/cardMessages");
const {
  getPublicProfile,
} = require("../../controllers/publicInfo/userPublicInfo");
router.get("/get-ranking-correct-word-intermediate/:slug", getRankingCorrectWordIntermediate);
router.get("/get-public-display-user-scores/:username", getPublicUserScore);
router.get(
  "/total-test/correct-word-intermediate",

  getTotalTestNoCorrectWordIntermediate
);

router.get("/get-card-messages", getCardMessages);
router.get("/get-correct-messages", getCorrectMessages);
router.get("/get-wrong-messages", getWrongMessages);
router.get("/getPublicProfile/:username", getPublicProfile);
module.exports = router;
