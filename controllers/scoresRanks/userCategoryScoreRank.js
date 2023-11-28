const UserScore = require("../../models/userScores/scores");
const User = require("../../models/user");

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
        // correctWordAdvanced: {
        //   scores:
        //     data.correctWordAdvanced && data.correctWordAdvanced.score !== null
        //       ? data.correctWordAdvanced.score
        //       : "N/A",
        //   rank:
        //     data.correctWordAdvanced && data.correctWordAdvanced.rank !== null
        //       ? data.correctWordAdvanced.rank
        //       : "N/A",
        // },
      };

      res.json(userScores);
    })
    .catch((err) => {
      const errorMessage = err.message || "Internal Server Error";
    
      res.status(500).json({ error: errorMessage });
    });
};

exports.getUserScoreCorrectWordAdvanced = (req, res) => {
  const user = req.params.user;

  UserScore.findOne({ user: user })
    .then((data) => {
      const userScores = {
        correctWordAdvanced: {
          scores:
            data.correctWordAdvanced && data.correctWordAdvanced.score !== null
              ? data.correctWordAdvanced.score
              : "N/A",
          rank:
            data.correctWordAdvanced && data.correctWordAdvanced.rank !== null
              ? data.correctWordAdvanced.rank
              : "N/A",
        },
      };

      res.json(userScores);
    })
    .catch((err) => {
      const errorMessage = err.message || "Internal Server Error";
     
      res.status(500).json({ error: errorMessage });
    });
};

exports.getUserScoreCorrectMeaningIntermediate = (req, res) => {
  const user = req.params.user;
  UserScore.findOne({ user: user })
    .then((data) => {
      const userScores = {
        correctMeaningIntermediate: {
          scores:
            data.correctMeaningIntermediate &&
            data.correctMeaningIntermediate.score !== null
              ? data.correctMeaningIntermediate.score
              : "N/A",
          rank:
            data.correctMeaningIntermediate &&
            data.correctMeaningIntermediate.rank !== null
              ? data.correctMeaningIntermediate.rank
              : "N/A",
        },
      };

      res.json(userScores);
    })
    .catch((err) => {
      const errorMessage = err.message || "Internal Server Error";
     
      res.status(500).json({ error: errorMessage });
    });
};

exports.getUserScoreCorrectMeaningAdvanced = (req, res) => {
  const user = req.params.user;
  UserScore.findOne({ user: user })
    .then((data) => {
      const userScores = {
        correctMeaningAdvanced: {
          scores:
            data.correctMeaningAdvanced &&
            data.correctMeaningAdvanced.score !== null
              ? data.correctMeaningAdvanced.score
              : "N/A",
          rank:
            data.correctMeaningAdvanced &&
            data.correctMeaningAdvanced.rank !== null
              ? data.correctMeaningAdvanced.rank
              : "N/A",
        },
      };

      res.json(userScores);
    })
    .catch((err) => {
      const errorMessage = err.message || "Internal Server Error";
     
      res.status(500).json({ error: errorMessage });
    });
};

exports.getUserScoreSynonymsIntermediate = (req, res) => {
  const user = req.params.user;
  UserScore.findOne({ user: user })
    .then((data) => {
      const userScores = {
        synonymsIntermediate: {
          scores:
            data.synonymsIntermediate &&
            data.synonymsIntermediate.score !== null
              ? data.synonymsIntermediate.score
              : "N/A",
          rank:
            data.synonymsIntermediate && data.synonymsIntermediate.rank !== null
              ? data.synonymsIntermediate.rank
              : "N/A",
        },
      };

      res.json(userScores);
    })
    .catch((err) => {
      const errorMessage = err.message || "Internal Server Error";
     
      res.status(500).json({ error: errorMessage });
    });
};

exports.getUserScoreSynonymsAdvanced = (req, res) => {
  const user = req.params.user;
  UserScore.findOne({ user: user })
    .then((data) => {
      const userScores = {
        synonymsAdvanced: {
          scores:
            data.synonymsAdvanced && data.synonymsAdvanced.score !== null
              ? data.synonymsAdvanced.score
              : "N/A",
          rank:
            data.synonymsAdvanced && data.synonymsAdvanced.rank !== null
              ? data.synonymsAdvanced.rank
              : "N/A",
        },
      };

      res.json(userScores);
    })
    .catch((err) => {
      const errorMessage = err.message || "Internal Server Error";
     
      res.status(500).json({ error: errorMessage });
    });
};
