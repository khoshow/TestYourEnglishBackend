const UserScores = require("../../models/userScores/scores");

exports.testGiven = (req, res) => {
  const slug = req.params.slug;
  const keyValuePairs = slug.split("&");

  // Create an object from the key-value pairs
  const paramsObject = keyValuePairs.reduce((acc, pair) => {
    const [key, value] = pair.split("=");
    acc[key] = value;
    return acc;
  }, {});

  console.log("Param Obj", paramsObject);
  let testCategory;
  let testNo;
  //   let sortQuery = {};
  //   sortQuery[rankQuery] = 1;

  switch (paramsObject.testCategory) {
    case "correct-word-intermediate":
      testCategory = "correctWordIntermediate";
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

  //   UserScores.find({
  //     user: req.user._id,
  //     "correctWordIntermediate.testArray": {
  //       $elemMatch: { testNumber: paramsObject.testNo },
  //     },
  //   }).then((data) => {
  //     console.log("Is this a data", data[0]);
  //     if (!data[0]) {
  //       const testInfo = data[0];
  //       console.log("Test Give2", testInfo);
  //       res.json({ attempt: false });
  //     } else {
  //       res.json({ attempt: true,  });
  //     }
  //   });

  UserScores.findOne(
    {
      user: req.user._id,
      "correctWordIntermediate.testArray": {
        $elemMatch: {
          testNumber: paramsObject.testNo,
        },
      },
    },
    {
      "correctWordIntermediate.testArray.$": 1,
    }
  ).then((data) => {
    if (!(data)) {
      res.json({ attempt: false });
    } else {
      res.json({ attempt: true, data: data.correctWordIntermediate });
    }
  });

  //   UserScores.aggregate([
  //     {
  //       $match: {
  //         user: req.user._id,
  //         "correctWordIntermediate.testArray": { $exists: true, $ne: [] },
  //       },
  //     },
  //     {
  //       $addFields: {
  //         "correctWordIntermediate.testArray": {
  //           $filter: {
  //             input: "$correctWordIntermediate.testArray",
  //             as: "testItem",
  //             cond: { $eq: ["$$testItem.testNumber", 1] },
  //           },
  //         },
  //       },
  //     },
  //   ]).then((data) => {
  //     console.log("Any2 data", data);
  //   });

  //   UserScores.countDocuments()
  //     .then((count) => {
  //       console.log("count", count);
  //       res.json(count);
  //     })
  //     .catch((err) => {
  //       console.error("my err", err);
  //       res.status(500).json({ error: err });
  //     });
};
