const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userScoreSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model if you have one
    required: true,
  },
  totalScore: {
    type: Number,
    required: true,
  },
  totalUsers: {
    type: Number,
  },
  rank: {
    type: Number,
  },

  correctWordIntermediate: {
    testNumber: [
      {
        testId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "TestCorrectWordIntermediate",
        },
        score: {
          type: Number,
        },
        testGiven: {
          type: Boolean,
          default: false,
        },
        rightlyAnswered: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TestCorrectWordIntermediate",
            // When writing into this, save it with the id of the specific question. See controller for reference
          },
        ],
        wronglyAnswered: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TestCorrectWordIntermediate",
            // When writing into this, save it with the id of the specific question
          },
        ],
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
  correctWordAdvanced: {
    testNumber: [
      {
        testId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "TestCorrectWordAdvanced",
        },
        score: {
          type: Number,
        },
        testGiven: {
          type: Boolean,
          default: false,
        },
        rightlyAnswered: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TestCorrectWordAdvanced",
          },
        ],
        wronglyAnswered: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TestCorrectWordAdvanced",
          },
        ],
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

const userScore = mongoose.model("UserScore", userScoreSchema);

module.exports = userScore;
