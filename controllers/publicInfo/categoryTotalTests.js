const TestCorrectWordIntermediate = require("../../models/tests/correctWord/intermediate");
const TestCorrectWordAdvanced = require("../../models/tests/correctWord/advanced");
const TestCorrectMeaningIntermediate = require("../../models/tests/correctMeaning/intermediate");
const TestCorrectMeaningAdvanced = require("../../models/tests/correctMeaning/advanced");
const TestSynonymsIntermediate = require("../../models/tests/synonyms/intermediate");
const TestSynonymsAdvanced = require("../../models/tests/synonyms/advanced");

exports.getTotalTestsNoCorrectWordIntermediate = (req, res) => {
  console.log("Hello hhh");
  TestCorrectWordIntermediate.countDocuments()
    .then((count) => {
      console.log("count", count);
      res.json(count);
    })
    .catch((err) => {
      console.error("my err", err);
      res.status(500).json({ error: err });
    });
};

exports.getTotalTestsNoCorrectWordAdvanced = (req, res) => {
  console.log("Hello hhh");
  TestCorrectWordAdvanced.countDocuments()
    .then((count) => {
      console.log("count", count);
      res.json(count);
    })
    .catch((err) => {
      console.error("my err", err);
      res.status(500).json({ error: err });
    });
};

exports.getTotalTestsNoCorrectMeaningIntermediate = (req, res) => {
  console.log("Hello hhh");
  TestCorrectMeaningIntermediate.countDocuments()
    .then((count) => {
      console.log("count", count);
      res.json(count);
    })
    .catch((err) => {
      console.error("my err", err);
      res.status(500).json({ error: err });
    });
};

exports.getTotalTestsNoCorrectMeaningAdvanced = (req, res) => {
  console.log("Hello hhh");
  TestCorrectMeaningAdvanced.countDocuments()
    .then((count) => {
      console.log("count", count);
      res.json(count);
    })
    .catch((err) => {
      console.error("my err", err);
      res.status(500).json({ error: err });
    });
};

exports.getTotalTestsNoSynonymsIntermediate = (req, res) => {
  console.log("Hello hhh");
  TestSynonymsIntermediate.countDocuments()
    .then((count) => {
      console.log("count", count);
      res.json(count);
    })
    .catch((err) => {
      console.error("my err", err);
      res.status(500).json({ error: err });
    });
};

exports.getTotalTestsNoSynonymsAdvanced = (req, res) => {
  console.log("Hello hhh");
  TestSynonymsAdvanced.countDocuments()
    .then((count) => {
      console.log("count", count);
      res.json(count);
    })
    .catch((err) => {
      console.error("my err", err);
      res.status(500).json({ error: err });
    });
};
