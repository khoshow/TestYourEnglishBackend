const user = require("../../models/user");
const UserScore = require("../../models/userScores/scores");

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
    .select("User")
    .populate("user", "name username photoUrl")

    .limit(10)
    .then((users) => {
      // Now the 'users' array is sorted by correctWordIntermediate.rank in ascending order
      const processedData = [];
      
      users.forEach((item) => {
      
        const userId = item.user._id;
        const name = item.user.name;
        const username = item.user.username;
        const score = item.correctWordIntermediate.score;
        const rank = item.correctWordIntermediate.rank;
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

exports.getPublicUserScore = (req, res) => {
  const username = req.params.username

  UserScore.findOne({ username })
    .then((user) => {
    
      res.json(user);
    })
    .catch((err) => {
      console.error("my err",err);
      res.status(500).json({ error: err });
    });
};
