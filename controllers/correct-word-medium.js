const CorrectWordsMedium = require("../models/correctWord/medium");
const TestCorrectWordIntermediate = require("../models/test/correctWordIntermediate");
// const Blog = require("../models/blog");
const slugify = require("slugify");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");
const { errorHandler } = require("../helpers/dbErrorHandler");

// exports.create = (req, res) => {
//   const { question, correctOption } = req.body;
//   const wrongOption1 = req.body.wrongOptions[0];
//   const wrongOption2 = req.body.wrongOptions[1];
//   const wrongOption3 = req.body.wrongOptions[2];
//   if (req.body.wrongOptions.length > 3) {
//     return res.status(400).json({
//       error: "Options more than 3. Only 3 wrong options allowed.",
//     });
//   }

//   let correctWord = new CorrectWordsMedium({
//     question: question,
//     correctOption: correctOption,
//     wrongOption1: wrongOption1,
//     wrongOption2: wrongOption2,
//     wrongOption3: wrongOption3,
//     createdBy: req.user._id,
//   });

//   correctWord
//     .save()
//     .then((data) => {
//       const responseObject = {
//         message:
//           "New word in 'Choose the Correct Word section' of medium level succesffuly created",
//         object: data,
//       };
//       // res.json({ message: responseObject });
//     })
//     .then(() => {
//       let addToTest = new TestCorrectWordIntermediate();
//       console.log("Add to test", addToTest);
//       addToTest.testNo = "1st Test";
//       addToTest.questionNo[0].question = question;
//       addToTest.questionNo[0].correctOption = correctOption;
//       addToTest.questionNo[0].wrongOption1 = wrongOption1;
//       addToTest.questionNo[0].wrongOption2 = wrongOption2;
//       addToTest.questionNo[0].wrongOption3 = wrongOption3;
//       addToTest
//         .save()
//         .then((data) => {
//           console.log("Save to test", data);
//         })
//         .catch((err) => {
//           console.log("Error", err);
//         });
//       // createdBy: req.user._id,
//       // let addToTest = new TestCorrectWordIntermediate();
//       // const lengthOfTest = addToTest.length;
//       // console.log("AddToTest", addToTest.questionNo.length);
//       // console.log("Length Test", lengthOfTest);
//       // async function getLastEntry() {
//       //   try {
//       //     const lastEntry = await addToTest
//       //       .findOne({}, {}, { sort: { _id: -1 } })
//       //       .exec();
//       //     return lastEntry;
//       //   } catch (error) {
//       //     console.error(error);
//       //     throw error;
//       //   }
//       // }
//       // // Usage example
//       // async function fetchData() {
//       //   try {
//       //     const lastEntry = await getLastEntry();
//       //     console.log("Last Entry:", lastEntry);
//       //     console.log("Length Last Entry:", lastEntry.length);
//       //     console.log("Length Last Entry question No:", lastEntry.questionNo);
//       //     console.log(
//       //       "Length Last Entry question No Lenght:",
//       //       lastEntry.questionNo.length
//       //     );
//       //   } catch (error) {
//       //     console.error("Error:", error);
//       //   }
//       // }
//       // fetchData(); // Call the async function
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err });
//     });
// };

exports.create = async (req, res) => {
  const { question, correctOption } = req.body;
  const wrongOption1 = req.body.wrongOptions[0];
  const wrongOption2 = req.body.wrongOptions[1];
  const wrongOption3 = req.body.wrongOptions[2];
  if (req.body.wrongOptions.length > 3) {
    return res.status(400).json({
      error: "Options more than 3. Only 3 wrong options allowed.",
    });
  }

  let correctWord = new CorrectWordsMedium({
    question: question,
    correctOption: correctOption,
    wrongOption1: wrongOption1,
    wrongOption2: wrongOption2,
    wrongOption3: wrongOption3,
    createdBy: req.user._id,
  });

  const docCount = await TestCorrectWordIntermediate.countDocuments()
    .then((count) => {
      console.log("Count", count);
      return count;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  const data = await TestCorrectWordIntermediate.findOne({}).sort({ _id: -1 });

  const addToTest1 = async () => {
    console.log("last Data", data);
    console.log("last Data length of Questions", data.questionNo.length);
    console.log("Doc Count", docCount);
    const newQuestion = {
      question: question,
      correctOption: correctOption,
      wrongOption1: wrongOption1,
      wrongOption2: wrongOption2,
      wrongOption3: wrongOption3,
    };
    if (data.questionNo.length !== 0 && data.questionNo.length < 4) {
      data.questionNo.push(newQuestion);

      await data
        .save()
        .then((data) => {
          console.log("Question added to questionNo array:", newQuestion);
          res.json(data);
        })
        .catch((err) => {
          console.log("Error", err);
        }); // Save the updated data
    } else if (data.questionNo.length !== 0 && data.questionNo.length == 4) {
      const modelLength = TestCorrectWordIntermediate.length;
      console.log("modelLength", modelLength);
      let newNumber = docCount + 1;
      const newQuizData = {
        testNo: "Test: " + newNumber,
        questionNo: [newQuestion],
        // createdBy: mongoose.Types.ObjectId(), // Replace with the actual user ID who created the quiz
      };
      const addToTest = new TestCorrectWordIntermediate(newQuizData);

      const savedData = await addToTest.save();
      console.log("Add a new test", savedData);
      res.json(savedData);
    } else {
      const newQuizData = {
        testNo: "Test: 1",
        questionNo: [newQuestion],
      };

      const addToTest = new TestCorrectWordIntermediate(newQuizData);
      const savedData = await addToTest.save();
      console.log("Create the first test", savedData);
      res.json(savedData);
    }
  };

  // addToTest1();

  // const addToTest = new TestCorrectWordIntermediate(newQuizData);

  try {
    await correctWord.save();

    addToTest1();
  } catch (error) {
    console.error("Error:", error);
  }
};

exports.list = (req, res) => {
  const projection = { name: 1, slug: 1 };
  CorrectWordsMedium.find({}, [
    "question",
    "correctOption",
    "wrongOption1",
    "wrongOption2",
    "wrongOption3",
  ])

    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};
