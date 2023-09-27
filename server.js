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
const vocabularyRoutes = require("./routes/vocabulary")
const correctWordRoutes = require("./routes/correct-word-medium")

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
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", testTypeRoutes)
app.use("/api", vocabularyRoutes)
app.use("/api", correctWordRoutes)

const port = process.env.PORT || 8020;
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
});
