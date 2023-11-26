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
    rightlyAnsweredQuestions: {},
    wronglyAnsweredQuestions: {},

    scores: { type: Number },
    rank: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const correctMeaningIntermediateSchema = new Schema(
  {
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TestCorrectMeaningIntermediate",
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

const correctMeaningAdvancedSchema = new Schema(
  {
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TestCorrectMeaningAdvanced",
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

const synonymsIntermediateSchema = new Schema(
  {
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TestSynonymsIntermediate",
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

const synonymsAdvancedSchema = new Schema(
  {
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SynonymsAdvanced",
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
    score: { type: Number, default: 0 },
    rank: {
      type: Number,
    },
    noOfUsers: { type: Number },
    testArray: [correctWordIntermediateSchema],
  },
  correctWordAdvanced: {
    score: { type: Number, default: 0 },
    rank: {
      type: Number,
    },
    noOfUsers: { type: Number },
    testArray: [correctWordAdvancedSchema],
  },

  correctMeaningIntermediate: {
    score: { type: Number, default: 0 },
    rank: {
      type: Number,
    },
    noOfUsers: { type: Number },
    testArray: [correctMeaningIntermediateSchema],
  },
  correctMeaningAdvanced: {
    score: { type: Number, default: 0 },
    rank: {
      type: Number,
    },
    noOfUsers: { type: Number },
    testArray: [correctMeaningAdvancedSchema],
  },

  synonymsIntermediate: {
    score: { type: Number, default: 0 },
    rank: {
      type: Number,
    },
    noOfUsers: { type: Number },
    testArray: [synonymsIntermediateSchema],
  },
  synonymsAdvanced: {
    score: { type: Number, default: 0 },
    rank: {
      type: Number,
    },
    noOfUsers: { type: Number },
    testArray: [synonymsAdvancedSchema],
  },
});

const userScore = mongoose.model("UserScore", userScoreSchema);

module.exports = userScore;
