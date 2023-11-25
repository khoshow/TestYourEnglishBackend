const express = require("express");
const router = express.Router();

const {
  getUserScoreCorrectWordIntermediate,
  getUserScoreCorrectWordAdvanced,
  getUserScoreCorrectMeaningIntermediate,
  getUserScoreCorrectMeaningAdvanced,
  getUserScoreSynonymsIntermediate,
  getUserScoreSynonymsAdvanced,
} = require("../../controllers/scoresRanks/userCategoryScoreRank");

router.get(
  "/score-correct-word-intermediate/:user",
  getUserScoreCorrectWordIntermediate
);
router.get(
  "/score-correct-word-advanced/:user",
  getUserScoreCorrectWordAdvanced
);
router.get(
  "/score-correct-meaning-intermediate/:user",
  getUserScoreCorrectMeaningIntermediate
);
router.get(
  "/score-correct-meaning-advanced/:user",
  getUserScoreCorrectMeaningAdvanced
);
router.get(
  "/score-synonyms-intermediate/:user",
  getUserScoreSynonymsIntermediate
);
router.get("/score-synonyms-advanced/:user", getUserScoreSynonymsAdvanced);

module.exports = router;
