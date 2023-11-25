const TestSynonymsAdvanced = require("../../../models/tests/synonyms/advanced");

exports.getTotalTestNoSynonymsAdvanced = (req, res) => {
    
    TestSynonymsAdvanced.countDocuments()
    .then((count) => {
   
      res.json(count);
    })
    .catch((err) => {
      console.error("my err", err);
      res.status(500).json({ error: err });
    });
};
