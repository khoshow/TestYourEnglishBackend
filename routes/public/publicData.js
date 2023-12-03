const express = require("express");
const router = express.Router();

const {
  getPublicUserScoreWithId,
  getPublicUserScoreWithUsername,
} = require("../../controllers/publicInfo/scoresRanking");

const {
  getTotalTestsNoCorrectWordIntermediate,
  getTotalTestsNoCorrectWordAdvanced,
  getTotalTestsNoCorrectMeaningIntermediate,
  getTotalTestsNoCorrectMeaningAdvanced,
  getTotalTestsNoSynonymsIntermediate,
  getTotalTestsNoSynonymsAdvanced,
} = require("../../controllers/publicInfo/categoryTotalTests");
const {
  getCategoryRanking,
} = require("../../controllers/scoresRanks/categoryRanking");
const {
  getCardMessages,
  getCorrectMessages,
  getWrongMessages,
} = require("../../controllers/publicInfo/cardMessages");
const {
  getPublicProfile,
} = require("../../controllers/publicInfo/userPublicInfo");

router.get("/get-category-ranking/:slug", getCategoryRanking);

router.get("/public-display-user-scores/:userid", getPublicUserScoreWithId);
router.get(
  "/get-public-display-user-scores/:username",
  getPublicUserScoreWithUsername
);
router.get(
  "/total-tests/correct-word-intermediate",
  getTotalTestsNoCorrectWordIntermediate
);
router.get(
  "/total-tests/correct-word-advanced",
  getTotalTestsNoCorrectWordAdvanced
);
router.get(
  "/total-tests/correct-meaning-intermediate",
  getTotalTestsNoCorrectMeaningIntermediate
);
router.get(
  "/total-tests/correct-meaning-advanced",
  getTotalTestsNoCorrectMeaningAdvanced
);
router.get(
  "/total-tests/synonyms-intermediate",
  getTotalTestsNoSynonymsIntermediate
);
router.get("/total-tests/synonyms-advanced", getTotalTestsNoSynonymsAdvanced);

router.get("/get-card-messages", getCardMessages);
router.get("/get-correct-messages", getCorrectMessages);
router.get("/get-wrong-messages", getWrongMessages);
router.get("/public-profile/:username", getPublicProfile);

module.exports = router;
