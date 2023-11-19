const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const correctWordIntermediateSchema = new Schema(
  {
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TestCorrectWordIntermediate",
    },
    testNumber: {
      type: Number,
    },

    score: {
      type: Number,
    },
    testGiven: {
      type: Boolean,
      default: false,
    },
    rightlyAnsweredQuestions: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "TestCorrectWordIntermediate",
      // When writing into this, save it with the id of the specific question. See controller for reference
    },

    wronglyAnsweredQuestions: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "TestCorrectWordIntermediate",
      // When writing into this, save it with the id of the specific question
    },

    scores: { type: Number },
    rank: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const correctWordAdvancedSchema = new Schema(
  {
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TestCorrectWordAdvanced",
    },
    testNumber: {
      type: Number,
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

    scores: {},
    rank: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const userScoreSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model if you have one
    required: true,
  },
  username: {
    type: String,
    ref: "User", // Reference to the User model if you have one
    required: true,
  },
  totalScore: {
    type: Number,
  },
  totalUsers: {
    type: Number,
  },
  rank: {
    type: Number,
  },

  correctWordIntermediate: {
    score: { type: Number, default:0 },
    rank: {
      type: Number,
    },
    noOfUsers: { type: Number },
    testArray: [correctWordIntermediateSchema],
  },
  correctWordAdvanced: {
    score: { type: Number },
    testArray: [correctWordAdvancedSchema],
  },
});

const userScore = mongoose.model("UserScore", userScoreSchema);

module.exports = userScore;
