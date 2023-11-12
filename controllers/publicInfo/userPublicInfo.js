const UserScore = require("../../models/userScores/scores");
const User = require("../../models/user");

exports.getPublicUserScore = (req, res) => {
  const user = req.params.user;
  console.log("back User Id", user);
  UserScore.findOne({ user: user })
    .then((data) => {
      console.log("user Detail", data);

      const userScores = {
        correctIntermediate: {
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
      };

      res.json(userScores);
    })
    .catch((err) => {
   
      const errorMessage = err.message || 'Internal Server Error';
      console.log("error hello", errorMessage);
      res.status(500).json({ error: errorMessage });
    });
};

exports.getUserPublicProfile = (req, res) => {
  const userId = req.params.user;
  User.findById(userId)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
};
