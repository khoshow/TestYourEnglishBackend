const mongoose = require("mongoose");

const correctWordAdvancedSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  options: [
    { correctOption: { type: String } },
    { wrongOption1: { type: String } },
    { wrongOption2: { type: String } },
    { wrongOption3: { type: String } },
  ],
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "CorrectWordAdvanced",
  correctWordAdvancedSchema
);
