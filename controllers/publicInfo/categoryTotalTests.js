const TestCorrectWordIntermediate = require("../../models/tests/correctWord/intermediate");
const TestCorrectWordAdvanced = require("../../models/tests/correctWord/advanced");
const TestCorrectMeaningIntermediate = require("../../models/tests/correctMeaning/intermediate");
const TestCorrectMeaningAdvanced = require("../../models/tests/correctMeaning/advanced");
const TestSynonymsIntermediate = require("../../models/tests/synonyms/intermediate");
const TestSynonymsAdvanced = require("../../models/tests/synonyms/advanced");

exports.getTotalTestsNoCorrectWordIntermediate = (req, res) => {
 
  TestCorrectWordIntermediate.countDocuments()
    .then((count) => {
      
      res.json(count);
    })
    .catch((err) => {
      console.error("my err", err);
      res.status(500).json({ error: err });
    });
};

exports.getTotalTestsNoCorrectWordAdvanced = (req, res) => {

  TestCorrectWordAdvanced.countDocuments()
    .then((count) => {
     
      res.json(count);
    })
    .catch((err) => {
      console.error("my err", err);
      res.status(500).json({ error: err });
    });
};

exports.getTotalTestsNoCorrectMeaningIntermediate = (req, res) => {

  TestCorrectMeaningIntermediate.countDocuments()
    .then((count) => {
     
      res.json(count);
    })
    .catch((err) => {
      console.error("my err", err);
      res.status(500).json({ error: err });
    });
};

exports.getTotalTestsNoCorrectMeaningAdvanced = (req, res) => {
  
  TestCorrectMeaningAdvanced.countDocuments()
    .then((count) => {
 
      res.json(count);
    })
    .catch((err) => {
     
      res.status(500).json({ error: err });
    });
};

exports.getTotalTestsNoSynonymsIntermediate = (req, res) => {
  
  TestSynonymsIntermediate.countDocuments()
    .then((count) => {
   
      res.json(count);
    })
    .catch((err) => {
      console.error("my err", err);
      res.status(500).json({ error: err });
    });
};

exports.getTotalTestsNoSynonymsAdvanced = (req, res) => {

  TestSynonymsAdvanced.countDocuments()
    .then((count) => {

      res.json(count);
    })
    .catch((err) => {
      console.error("my err", err);
      res.status(500).json({ error: err });
    });
};
