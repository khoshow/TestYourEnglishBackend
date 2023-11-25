const TestSynonymsIntermediate = require("../../../models/tests/synonyms/intermediate");

exports.getTotalTestNoSynonymsIntermediate = (req, res) => {
  TestSynonymsIntermediate.countDocuments()
    .then((count) => {
      res.json(count);
    })
    .catch((err) => {
      console.error("my err", err);
      res.status(500).json({ error: err });
    });
};
