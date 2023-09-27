const Test = require("../models/testType");
// const Blog = require("../models/blog");
const slugify = require("slugify");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
  const data = req.body;
  console.log("Data", data);
  return "Hello";
  //   if (!name || !name.length) {
  //     return res.status(400).json({
  //       error: "Test name is required",
  //     });
  //   }
  //   let slug = slugify(name).toLowerCase();
  //   let test = new Test();
  //   test.name = name;
  //   test.slug = slug;

  //   Test.findOne({ name: req.body.name })
  //     .then((result) => {
  //       if (result) {
  //         res.json({ error: "The test type already exist" });
  //       } else {
  //         const test = new Test({ name: name, slug: slug });
  //         return test.save();
  //       }
  //     })
  //     .then((savedTestType) => {
  //       const responseObject = {
  //         message: "Test type succesffuly created",
  //         object: savedTestType,
  //       };
  //       res.json({ message: responseObject });
  //     })
  //     .catch((error) => {
  //       res.status(500).json({ error: error });
  //     });
};

exports.list = (req, res) => {
  const projection = { name: 1, slug: 1 };
  Test.find({}, projection)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};
