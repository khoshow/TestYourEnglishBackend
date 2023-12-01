const SynonymsAdvanced = require("../../../../models/categories/synonyms/advanced");
const TestSynonymsAdvanced = require("../../../../models/tests/synonyms/advanced");

const slugify = require("slugify");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");
const { errorHandler } = require("../../../../helpers/dbErrorHandler");

exports.create = async (req, res) => {
  const { question, correctOption } = req.body;
  const wrongOption1 = req.body.wrongOption1;
  const wrongOption2 = req.body.wrongOption2;
  const wrongOption3 = req.body.wrongOption3;

  let correctWord = new SynonymsAdvanced({
    question: question,
    correctOption: correctOption,
    wrongOption1: wrongOption1,
    wrongOption2: wrongOption2,
    wrongOption3: wrongOption3,
    createdBy: req.user._id,
  });

  const docCount = await TestSynonymsAdvanced.countDocuments()
    .then((count) => {
    
      return count;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  const data = await TestSynonymsAdvanced.findOne({}).sort({ _id: -1 });

  const addToTest1 = async (data) => {
    let questionNoLength;
  
    if (data === null) {
      questionNoLength = 0;
     
    } else {
      questionNoLength = data.questionNo.length;
    }
    
    const newQuestion = {
      question: question,
      correctOption: correctOption,
      wrongOption1: wrongOption1,
      wrongOption2: wrongOption2,
      wrongOption3: wrongOption3,
    };
    if (questionNoLength !== 0 && data.questionNo.length < 8) {
      data.questionNo.push(newQuestion);

      await data
        .save()
        .then((data) => {
         
          res.json(data);
        })
        .catch((err) => {
          console.log("Error", err);
        }); // Save the updated data
    } else if (questionNoLength !== 0 && data.questionNo.length == 8) {
      const modelLength = TestSynonymsAdvanced.length;
  
      let newNumber = docCount + 1;
      const newQuizData = {
        testNo: "Test: " + newNumber,
        questionNo: [newQuestion],
        // createdBy: mongoose.Types.ObjectId(), // Replace with the actual user ID who created the quiz
      };
      const addToTest = new TestSynonymsAdvanced(newQuizData);

      const savedData = await addToTest.save();
    
      res.json(savedData);
    } else {
      const newQuizData = {
        testNo: "Test: 1",
        questionNo: [newQuestion],
      };

      const addToTest = new TestSynonymsAdvanced(newQuizData);
      const savedData = await addToTest.save();
     
      res.json(savedData);
    }
  };

  // addToTest1();

  // const addToTest = new TestSynonymsAdvanced(newQuizData);

  try {
    await correctWord.save();

    addToTest1(data);
  } catch (error) {
    console.error("Error:", error);
  }
};

exports.list = (req, res) => {
  const projection = { name: 1, slug: 1 };
  SynonymsAdvanced.find({}, [
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

exports.getTestNo = async (req, res) => {
  try {
    const slug = req.params.slug.toLowerCase();

    const testNo = parseInt(slug.split("-")[1] - 1);

    const documents = await TestSynonymsAdvanced.findOne({}).skip(
      testNo
    );
    if (documents === null) {
      return res.status(500).json({
        error:
          "Ooops! Seems like you are trying to explore something which is still unavailable.",
      });
    }
    
    res.json(documents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.testList = (req, res) => {
  const { skip, limit } = req.body;

  YourModel.find()
    .skip(skip)
    .limit(6)
    .then((documents) => {
      if (err) {
        console.error(err);
        return;
      }

      res.json(documents);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
