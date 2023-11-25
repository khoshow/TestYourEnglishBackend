const UserScore = require("../models/userScores/scores");
const User = require("../models/user");

exports.getUserScoreCorrectWordIntermediate = (req, res) => {
  const user = req.params.user;

  UserScore.findOne({ user: user })
    .then((data) => {
    

      const userScores = {
        correctWordIntermediate: {
          scores:
            data.correctWordIntermediate &&
            data.correctWordIntermediate.score !== null
              ? data.correctWordIntermediate.score
              : "N/A",
          rank:
            data.correctWordIntermediate &&
            data.correctWordIntermediate.rank !== null
              ? data.correctWordIntermediate.rank
              : "N/A",
        },
        correctWordAdvanced: {
          scores:
            data.correctWordAdvanced &&
            data.correctWordAdvanced.score !== null
              ? data.correctWordAdvanced.score
              : "N/A",
          rank:
            data.correctWordAdvanced &&
            data.correctWordAdvanced.rank !== null
              ? data.correctWordAdvanced.rank
              : "N/A",
        },
      };

      res.json(userScores);
    })
    .catch((err) => {
   
      const errorMessage = err.message || 'Internal Server Error';
      console.log("error hello", errorMessage);
      res.status(500).json({ error: errorMessage });
    });
};