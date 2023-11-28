const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const contactForm = require("./routes/webContact/contactForm");

const vocabularyRoutes = require("./routes/vocabulary");

const profile = require("./routes/userProfile");
const publicAccess = require("./routes/public/publicData");

const privateCorrectWordIntermediate = require("./routes/private/correctWordIntermediate");
const privateCorrectWordAdvanced = require("./routes/private/correctWordAdvanced");
const privateCorrectMeaningIntermediate = require("./routes/private/correctMeaningIntermediate");
const privateCorrectMeaningAdvanced = require("./routes/private/correctMeaningAdvanced");
const privateSynonymsIntermediate = require("./routes/private/synonymsIntermediate");
const privateSynonymsAdvanced = require("./routes/private/synonymsAdvanced");
const testGivenOrNot = require("./routes/private/testGivenOrNot");
const userCategoryScoreRank = require("./routes/public/userCategoryScoreRank");

const app = express();
app.use(express.static(__dirname + "/public"));

let productionOrDevelopment;

if (process.env.NODE_ENV == "production") {
  productionOrDevelopment = process.env.DATABASE_CLOUD;
} else if (process.env.NODE_ENV == "development") {
  productionOrDevelopment = process.env.DATABASE_LOCAL;
}

mongoose
  .connect(productionOrDevelopment)
  .then(() => console.log("DB Connected"))
  .catch((err) => {
    console.log(err);
  });

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://test-my-english-online-frontend.vercel.app", // Set the appropriate origin or '*' for any origin (be cautious with '*')
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"], // Specify the allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify the allowed headers
  })
);

app.use("/api", authRoutes);
app.use("/api", userRoutes);

app.use("/api", contactForm);

app.use("/api", vocabularyRoutes);

app.use("/api", profile);
app.use("/api", publicAccess);

app.use("/api", privateCorrectWordIntermediate);
app.use("/api", privateCorrectWordAdvanced);
app.use("/api", privateCorrectMeaningIntermediate);
app.use("/api", privateCorrectMeaningAdvanced);
app.use("/api", privateSynonymsIntermediate);
app.use("/api", privateSynonymsAdvanced);
app.use("/api", testGivenOrNot);
app.use("/api", userCategoryScoreRank);

const port = process.env.PORT || 8020;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
