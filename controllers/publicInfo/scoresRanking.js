const user = require("../../models/user");
const UserScore = require("../../models/userScores/scores");

exports.getPublicUserScoreWithId = (req, res) => {
  const userid = req.params.userid;

  UserScore.findOne({ user: userid })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error("my err", err);
      res.status(500).json({ error: err });
    });
};

exports.getPublicUserScoreWithUsername = (req, res) => {
  const username = req.params.username;
 
  UserScore.findOne({ username: username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error("my err", err);
      res.status(500).json({ error: err });
    });
};
