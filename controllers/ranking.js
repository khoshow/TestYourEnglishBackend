const user = require("../models/user");
const UserScore = require("../models/userScores/scores");

exports.getRanking = (req, res) => {
  const slug = req.params.slug;

  let rankQuery;
  let selectQuery;
  let sortQuery = {};
  sortQuery[rankQuery] = 1;

  switch (slug) {
    case "ranking-correct-word-intermediate":
      rankQuery = "correctWordIntermediate.score";
      selectQuery = "correctWordIntermediate";
      break;
    case "ranking-correct-word-advanced":
      rankQuery = "correctWordAdvanced.score";
      selectQuery = "correctWordAdvanced";
      break;
    default:
      rankQuery = "correctWordIntermediate.score";
      selectQuery = "correctWordIntermediate";
  }
  const fieldToSelectScore = selectQuery + ".score";
  const fieldToSelectRank = selectQuery + ".rank";
  UserScore.find()
    .sort(sortQuery)
    .select(fieldToSelectScore)
    .select(fieldToSelectRank)
    .select("user")
    .populate("user", "name")
    .limit(10)
    .then((users) => {
      // Now the 'users' array is sorted by correctWordIntermediate.rank in ascending order
      const processedData = [];
    
      users.forEach((item) => {
        const userId = item.user._id;
        const userName = item.user.name;
        const score = item.correctWordIntermediate.score;
        const rank = item.correctWordIntermediate.rank;

        const processedItem = {
          section: selectQuery,
          userId: userId,
          userName: userName,
          score: score,
          rank: rank,
        };
        processedData.push(processedItem);
      });

    
      res.json(processedData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
};
