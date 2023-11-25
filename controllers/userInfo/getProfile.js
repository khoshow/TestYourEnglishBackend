const UserScore = require("../../models/userScores/scores");
const User = require("../../models/user");

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
