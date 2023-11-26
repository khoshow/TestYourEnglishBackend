const CardMessages = require("../../models/cardMessages");

exports.getCardMessages = async (req, res) => {

  try {
    const result = await CardMessages.aggregate([
      { $unwind: "$quotes" }, // Destructure the 'quotes' array
      { $sample: { size: 10 } }, // Get 10 random elements
      { $replaceRoot: { newRoot: "$quotes" } }, // Replace the root with 'quotes' objects
    ]);

    res.json(result);
  } catch (error) {
    console.error("Error querying data:", error);
  }
};

exports.getCorrectMessages = async (req, res) => {
  try {
    const result = await CardMessages.aggregate([
      { $sample: { size: 10 } }, // Get 10 random documents from the collection
      { $project: { whenCorrectMessages: 1, _id: 0 } }, // Project only the 'whenCorrectMessages' field
      { $unwind: "$whenCorrectMessages" }, // Unwind the array of correct messages
      { $sample: { size: 10 } }, // Get 10 random correct messages
    ]);

    const randomCorrectMessages = result.map(
      (item) => item.whenCorrectMessages
    );

   
    res.json(randomCorrectMessages);
  } catch (error) {
    console.error("Error querying data:", error);
  }
};

exports.getWrongMessages = async (req, res) => {
  try {
    const result = await CardMessages.aggregate([
      { $sample: { size: 10 } }, // Get 10 random documents from the collection
      { $project: { whenWrongMessages: 1, _id: 0 } }, // Project only the 'whenCorrectMessages' field
      { $unwind: "$whenWrongMessages" }, // Unwind the array of correct messages
      { $sample: { size: 10 } }, // Get 10 random correct messages
    ]);

    const randomWrongMessages = result.map((item) => item.whenWrongMessages);

    res.json(randomWrongMessages);
  } catch (error) {
    console.error("Error querying data:", error);
  }
};
