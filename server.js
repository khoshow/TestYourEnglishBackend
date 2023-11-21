const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const testTypeRoutes = require("./routes/testType");
const vocabularyRoutes = require("./routes/vocabulary");
const correctWordRoutes = require("./routes/correctWordIntermediate");
const ranking = require("./routes/ranking");
const profile = require("./routes/userProfile");
const publicAccess = require("./routes/public/publicData")

const privateCorrectWordIntermediate = require("./routes/private/correctWordIntermediate")
const privateCorrectWordAdvanced = require("./routes/private/correctWordAdvanced")
const privateCorrectMeaningIntermediate=require("./routes/private/correctMeaningIntermediate")
const privateCorrectMeaningAdvanced= require("./routes/private/correctMeaningAdvanced")
const privateSynonymsIntermediate= require("./routes/private/synonymsIntermediate")
const privateSynonymsAdvanced=require("./routes/private/synonymsAdvanced")
const testGivenOrNot = require("./routes/private/testGivenOrNot")

const app = express();
app.use(express.static(__dirname + "/public"));

let productionOrDevelopment;
console.log("prod or ", process.env.NODE_ENV);
console.log("Ur", process.env.DATABASE_LOCAL);
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

app.use(cors({ origin: '*' }));

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", testTypeRoutes);
app.use("/api", vocabularyRoutes);
app.use("/api", correctWordRoutes);
app.use("/api", ranking);
app.use("/api", profile);
app.use("/api", publicAccess);

app.use("/api", privateCorrectWordIntermediate)
app.use("/api", privateCorrectWordAdvanced);
app.use("/api", privateCorrectMeaningIntermediate);
app.use("/api", privateCorrectMeaningAdvanced);
app.use("/api", privateSynonymsIntermediate);
app.use("/api", privateSynonymsAdvanced);
app.use("/api", testGivenOrNot)


const port = process.env.PORT || 8020;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
