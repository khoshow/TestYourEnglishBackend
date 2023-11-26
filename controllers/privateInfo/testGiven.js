const UserScores = require("../../models/userScores/scores");

exports.testGiven = (req, res) => {
  const slug = req.params.slug;
  const keyValuePairs = slug.split("&");
  // hello
  // Create an object from the key-value pairs
  const paramsObject = keyValuePairs.reduce((acc, pair) => {
    const [key, value] = pair.split("=");
    acc[key] = value;
    return acc;
  }, {});

  console.log("Param Obj here test here", paramsObject);
  let testCategory;
  let selectQuery;
  let selectQuery2;
  let testNo;

  switch (paramsObject.testCategory) {
    case "correct-word-intermediate":
      testCategory = "correctWordIntermediate";
      selectQuery = {
        "correctWordIntermediate.testArray": {
          $elemMatch: {
            testNumber: paramsObject.testNo,
          },
        },
      };
      selectQuery2 = { "correctWordIntermediate.testArray.$": 1 };
      break;
    case "correct-word-advanced":
      testCategory = "correctWordAdvanced";
      selectQuery = {
        "correctWordAdvanced.testArray": {
          $elemMatch: {
            testNumber: paramsObject.testNo,
          },
        },
      };
      selectQuery2 = { "correctWordAdvanced.testArray.$": 1 };
      break;
    case "correct-meaning-intermediate":
      testCategory = "correctMeaningIntermediate";
      selectQuery = {
        "correctMeaningIntermediate.testArray": {
          $elemMatch: {
            testNumber: paramsObject.testNo,
          },
        },
      };
      selectQuery2 = { "correctMeaningIntermediate.testArray.$": 1 };
      break;
    case "correct-meaning-advanced":
      testCategory = "correctMeaningAdvanced";
      selectQuery = {
        "correctMeaningAdvanced.testArray": {
          $elemMatch: {
            testNumber: paramsObject.testNo,
          },
        },
      };
      selectQuery2 = { "correctMeaningAdvanced.testArray.$": 1 };
      break;
    case "synonyms-intermediate":
      testCategory = "synonymsIntermediate";
      selectQuery = {
        "synonymsIntermediate.testArray": {
          $elemMatch: {
            testNumber: paramsObject.testNo,
          },
        },
      };
      selectQuery2 = { "synonymsIntermediate.testArray.$": 1 };
      break;
    case "synonyms-advanced":
      testCategory = "synonymsAdvanced";
      selectQuery = {
        "synonymsAdvanced.testArray": {
          $elemMatch: {
            testNumber: paramsObject.testNo,
          },
        },
      };
      selectQuery2 = { "synonymsAdvanced.testArray.$": 1 };
      break;
    default:
      testCategory = "correctWordIntermediate";
      selectQuery = "correctWordIntermediate.testArray";
      selectQuery2 = "correctWordIntermediate.testArray.$";
  }

  UserScores.findOne(
    {
      user: req.user._id,
      ...selectQuery,
    },
    selectQuery2
  ).then((data) => {
    if (!data) {
      res.json({ attempt: false });
    } else {
      res.json({ attempt: true, data: data[testCategory] });
    }
  });
};
