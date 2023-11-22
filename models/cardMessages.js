const mongoose = require("mongoose");

const cardMessagesSchema = new mongoose.Schema({
  quotes: [
    {
      quote: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
    },
  ],
  whenCorrectMessages: {
    type: [String],
    required: true,
  },
  whenWrongMessages: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("CardMessages", cardMessagesSchema);
