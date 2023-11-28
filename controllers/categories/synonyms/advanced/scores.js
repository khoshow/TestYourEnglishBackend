const UserScore = require("../../../../models/userScores/scores");

exports.updateScore = async (req, res) => {
  const { userId,username, testNo, testId, rightlyAnswered, wronglyAnswered } = req.body;

  // const rightlyAnsweredId = rightlyAnswered.map((obj) => obj.id);
  // const wronglyAnsweredId = wronglyAnswered.map((obj) => obj.id);
  const scoreToBeAdded = rightlyAnswered.length;

  await UserScore.findOneAndUpdate(
    { user: userId },
    {
      user: userId,
      username:username,

      $push: {
        "synonymsAdvanced.testArray": {
          testId: testId,
          testNumber: testNo,
          testGiven: true,
          rightlyAnsweredQuestions: rightlyAnswered,
          wronglyAnsweredQuestions: wronglyAnswered,
        },
      },
    },

    {
      upsert: true, // Create a new document if no document matches the query
      new: true, // Return the modified document
      setDefaultsOnInsert: true,
    }
  )

    .then(async (updatedData) => {
      const documentCount = await UserScore.countDocuments({});
    
      updatedData.synonymsAdvanced.score += scoreToBeAdded;
      updatedData.synonymsAdvanced.noOfUsers = documentCount;

      await updatedData.save();
      const rank =
        (await UserScore.countDocuments({
          "synonymsAdvanced.score": {
            $gt: updatedData.synonymsAdvanced.score,
          },
        })) + 1;

      updatedData.synonymsAdvanced.rank = rank;
      await updatedData.save();
      
      res.status(200).json(updatedData);
    })

    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

exports.getTestData = (req, res) => {
  

  UserScore.find({ user: req.params.slug })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
