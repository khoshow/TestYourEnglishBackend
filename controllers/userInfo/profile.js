const User = require("../../models/user");
const multer = require("multer");
const fs = require("fs-extra");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");

exports.profileUpdateStatus = (req, res) => {
  const userId = req.user._id;
  const newStatus = req.body.newStatus;
  User.findByIdAndUpdate(userId, { status: newStatus }, { new: true })
    .then((updatedUser) => {
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        console.log("User not found");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

exports.profileUpdateMessage = (req, res) => {
  const userId = req.user._id;
  const newMessage = req.body.newMessage;
  User.findByIdAndUpdate(userId, { message: newMessage }, { new: true })
    .then((updatedUser) => {
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        console.log("User not found");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

exports.profileUpdateName = (req, res) => {
  const userId = req.user._id;
  const newName = req.body.newName;
  User.findByIdAndUpdate(userId, { name: newName }, { new: true })
    .then((updatedUser) => {
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        console.log("User not found");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

exports.profileUpdateUsername = (req, res) => {
  const userId = req.user._id;
  const newUsername = req.body.newUsername;

  User.findByIdAndUpdate(userId, { username: newUsername }, { new: true })
    .then((updatedUser) => {
      if (updatedUser) {
        const token = jwt.sign(
          { _id: updatedUser._id },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );
        res.cookie("token", token, { expiresIn: "1d" });
        const { _id, username, name, email, role } = updatedUser;

        res.json({
          token,
          updatedUser,
        });
        // res.json(updatedUser);
      } else {
        console.log("User not found");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

exports.profileUpdateSex = (req, res) => {
  const userId = req.user._id;
  const newSex = req.body.newSex;
  User.findByIdAndUpdate(userId, { Sex: newSex }, { new: true })
    .then((updatedUser) => {
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        console.log("User not found");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

exports.profileUpdateDob = (req, res) => {
  const userId = req.user._id;
  const newDob = req.body.newDob;
  User.findByIdAndUpdate(userId, { dob: newDob }, { new: true })
    .then((updatedUser) => {
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        console.log("User not found");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

exports.profileUpdateCountry = (req, res) => {
  const userId = req.user._id;
  const newCountry = req.body.newCountry;
  User.findByIdAndUpdate(userId, { country: newCountry }, { new: true })
    .then((updatedUser) => {
      if (updatedUser) {
        const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        res.cookie("token", token, { expiresIn: "1d" });
        res.json(updatedUser);
      } else {
        console.log("User not found");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

exports.profileUpdateState = (req, res) => {
  const userId = req.user._id;
  const newState = req.body.newState;
  User.findByIdAndUpdate(userId, { state: newState }, { new: true })
    .then((updatedUser) => {
      if (updatedUser) {
        const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        res.cookie("token", token, { expiresIn: "1d" });
        res.json(updatedUser);
      } else {
        console.log("User not found");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

exports.profileUpdateAbout = (req, res) => {
  const userId = req.user._id;
  const newAbout = req.body.newAbout;
  User.findByIdAndUpdate(userId, { about: newAbout }, { new: true })
    .then((updatedUser) => {
      if (updatedUser) {
        const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        res.cookie("token", token, { expiresIn: "1d" });
        res.json(updatedUser);
      } else {
        console.log("User not found");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_KEY,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
const storage = multer.diskStorage({
  destination: "/tmp/uploads",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
exports.profileUpdatePhoto = async (req, res) => {
  const userId = req.user._id;
  console.log("user", userId);

  try {
    upload.single("photo")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: "Error uploading file." });
      }

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded." });
      }

      const buffer = await fs.promises.readFile(req.file.path);

      // Upload image directly to Cloudinary using a Promise
      const cloudinaryResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "/testMyEnglishOnline/Profile" }, // Replace with your desired folder name
            (error, result) => {
              if (error) {
                // console.error("Error uploading image to Cloudinary:", error);
                reject(error);
              } else {
                // console.log("Image uploaded to Cloudinary:", result);
                resolve(result);
              }
            }
          )
          .end(buffer);
      });

      // Update the user's photo information in the database
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          photoUrl: cloudinaryResponse.secure_url,
        },
        { new: true }
      );

      if (updatedUser) {
        const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        res.cookie("token", token, { expiresIn: "1d" });
        const { _id, username, name, email, role, photoUrl } = updatedUser;

        res.json({
          token,
          updatedUser: { _id, username, name, email, role, photoUrl },
        });
      } else {
        console.log("User not found");
      }

      // Cleanup: Delete the local file
      fs.unlink(req.file.path);
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
