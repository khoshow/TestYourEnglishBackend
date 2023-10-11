const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sectionScoreSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model if you have one
    required: true,
  },
  totalScore: {
    type: Number,
    required: true,
  },
  rank: {
    type: Number,
  },

  correctWordMedium: {
    testNumber: [
      {
        testId: {
          type: mongoose.Schema.Types.ObjectId,
        },
        score: {
          type: Number,
        },
        testGiven: {
          type: Boolean,
          default: false,
        },
        rightlyAnswered: [],
        wronglyAnswered: [],
      },
      {
        timestamps: true,
      },
    ],
    scores: {},
    rank: {
      type: Number,
    },
  },
});

const SectionScore = mongoose.model("SectionScore", sectionScoreSchema);

module.exports = SectionScore;
