const user = require("../../models/user");
const UserScore = require("../../models/userScores/scores");

exports.getCategoryRanking = (req, res) => {
  console.log("Am i been called");
  const slug = req.params.slug;
  let rankQuery;
  let selectQuery;

  switch (slug) {
    case "ranking-correct-word-intermediate":
      rankQuery = "correctWordIntermediate.score";
      selectQuery = "correctWordIntermediate";
      break;
    case "ranking-correct-word-advanced":
      rankQuery = "correctWordAdvanced.score";
      selectQuery = "correctWordAdvanced";
      break;
    case "ranking-correct-meaning-intermediate":
      rankQuery = "correctMeaningIntermediate.score";
      selectQuery = "correctMeaningIntermediate";
      break;
    case "ranking-correct-meaning-advanced":
      rankQuery = "correctMeaningAdvanced.score";
      selectQuery = "correctMeaningAdvanced";
      break;
    case "ranking-synonyms-intermediate":
      rankQuery = "synonymsIntermediate.score";
      selectQuery = "synonymsIntermediate";
      break;
    case "ranking-synonyms-advanced":
      rankQuery = "synonymsAdvanced.score";
      selectQuery = "synonymsAdvanced";
      break;
    default:
      rankQuery = "correctWordIntermediate.score";
      selectQuery = "correctWordIntermediate";
  }
  const fieldToSelectScore = selectQuery + ".score";
  const fieldToSelectRank = selectQuery + ".rank";
  let sortQuery = {};
  sortQuery[rankQuery] = -1;

  UserScore.find()
    .sort(sortQuery)
    .select(fieldToSelectScore)
    .select(fieldToSelectRank)
    .select("User")
    .populate("user", "name username photoUrl")

    .limit(10)
    .then((users) => {
      const processedData = [];

      users.forEach((item) => {
        const userId = item.user._id;
        const name = item.user.name;
        const username = item.user.username;
        const score = item[selectQuery].score;
        const rank = item[selectQuery].rank;
        const photoUrl = item.user.photoUrl;

        const processedItem = {
          section: selectQuery,
          userId: userId,
          name: name,
          username: username,
          photoUrl: photoUrl,
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
