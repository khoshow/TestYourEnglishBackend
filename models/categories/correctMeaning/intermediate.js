const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const correctMeaningIntermediateSchema = new mongoose.Schema({
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
  createdBy:{
    type:ObjectId,
    ref:'user'
  }
});

module.exports = mongoose.model("CorrectMeaningIntermediate", correctMeaningIntermediateSchema);
