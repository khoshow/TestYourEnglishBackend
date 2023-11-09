const UserScore = require("../models/userScores/scores");
const User = require("../models/user");

exports.getUserScore = (req, res) => {
  const user = req.params.user;
  console.log("back User Id", user);
  UserScore.findOne({ user: user })
    .then((data) => {
      console.log("user Detail", data);
      const userScores = {
        correctIntermediate: {
          scores: data.correctWordIntermediate.score,
          rank: data.correctWordIntermediate.rank,
        },
      };

      res.json(userScores);
    })
    .catch((err) => {
      console.log("error", err);
      res.status(500).json({ error: err });
    });
};

exports.getUserProfile = (req, res) => {
  const userId = req.params.user;
  User.findById(userId)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
};
