const mongoose = require("mongoose");

const synonymsAdvanced = new mongoose.Schema({
  testNo: {
    type: String,
    required: true,
  },
  questionNo: [
    {
      question: {
        type: String,
        required: true,
      },
      correctOption: {
        type: String,
        correct: true,
        required: true,
      },
      wrongOption1: {
        type: String,
        correct: false,
        required: true,
      },
      wrongOption2: {
        type: String,
        correct: false,
        required: true,
      },
      wrongOption3: {
        type: String,
        required: true,
        correct: false,
      },
    },
  ],
});

module.exports = mongoose.model("TestSynonymsAdvanced", synonymsAdvanced);
