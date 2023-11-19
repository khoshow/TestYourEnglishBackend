const CorrectWordIntermediate = require("../../../models/correctWord/intermediate");

exports.getTotalTestNoCorrectWordIntermediate = (req, res) => {
    console.log("Hello hhh");
  CorrectWordIntermediate.countDocuments()
    .then((count) => {
      console.log("count", count);
      res.json(count);
    })
    .catch((err) => {
      console.error("my err", err);
      res.status(500).json({ error: err });
    });
};
