const UserScore = require("../../../../models/userScores/scores");

exports.updateScore = async (req, res) => {
  const { userId, testNo, testId, rightlyAnswered, wronglyAnswered } = req.body;

  // const rightlyAnsweredId = rightlyAnswered.map((obj) => obj.id);
  // const wronglyAnsweredId = wronglyAnswered.map((obj) => obj.id);
  const scoreToBeAdded = rightlyAnswered.length;

  await UserScore.findOneAndUpdate(
    { user: userId },
    {
      user: req.body.userId,

      $push: {
        "correctWordIntermediate.testArray": {
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
      console.log("Succesfully Updated", updatedData);
      updatedData.correctWordIntermediate.score += scoreToBeAdded;
      updatedData.correctWordIntermediate.noOfUsers = documentCount;

      await updatedData.save();
      const rank =
        (await UserScore.countDocuments({
          "correctWordIntermediate.score": {
            $gt: updatedData.correctWordIntermediate.score,
          },
        })) + 1;

      updatedData.correctWordIntermediate.rank = rank;
      await updatedData.save();
      console.log("Successfully Updated", updatedData);
      res.status(200).json(updatedData);
    })

    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

exports.getTestData = (req, res) => {
  console.log("Para", req.params.slug);
  console.log();
  UserScore.find({ user: req.params.slug })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};