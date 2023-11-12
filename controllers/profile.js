const User = require("../models/user");
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
        console.log(`User's name updated to: ${updatedUser.status}`);
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
        console.log(`User's name updated to: ${updatedUser.message}`);
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
        console.log(`User's name updated to: ${updatedUser.name}`);
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
  console.log("Username", req.body.newUsername);
  User.findByIdAndUpdate(userId, { username: newUsername }, { new: true })
    .then((updatedUser) => {
      if (updatedUser) {
        console.log(`User's name updated to: ${updatedUser.status}`);
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
        console.log(`User's name updated to: ${updatedUser.sex}`);
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
        console.log(`User's name updated to: ${updatedUser.dob}`);
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
        console.log(`User's name updated to: ${updatedUser.country}`);
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
        console.log(`User's name updated to: ${updatedUser.state}`);
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
        console.log(`User's name updated to: ${updatedUser.about}`);
        res.json(updatedUser);
      } else {
        console.log("User not found");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

// exports.profileUpdatePhoto = (req, res) => {
//   const userId = req.user._id;
//   const newPhoto = req.file;
//   console.log("Photo", req.body);
//   // console.log("File", req.body.photo.data);

//   const photo = {
//     data: req.body.photo,
//     contentType: req.body.photo.type,
//   };
//   User.findByIdAndUpdate(userId, { photo }, { new: true })
//     .then((updatedUser) => {
//       if (updatedUser) {
//         console.log(`User's name updated to: ${updatedUser.about}`);
//         res.json(updatedUser);
//       } else {
//         console.log("User not found");
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });

//   res.json("hello");
// };

// exports.profileUpdatePhoto = (req, res) => {
//   const userId = req.user._id;
//   // const newPhoto = req.file.buffer
//   // console.log("newPhot", newPh);
//   console.log("Photo", req.body);
//   // console.log("Photo9 strin", req);
//   // console.log("File", req.body.photo.data);

//   const photo = {
//     data: req.body.photo,
//     contentType: req.body.photo.type,
//   };
//   User.findByIdAndUpdate(userId, { photo }, { new: true })
//     .then((updatedUser) => {
//       if (updatedUser) {
//         console.log(`User's name updated to: ${updatedUser.about}`);
//         res.json(updatedUser);
//       } else {
//         console.log("User not found");
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });

//   res.json("hello");
// };
cloudinary.config({
  cloud_name: "dreunylt8",
  api_key: "774751474439835",
  api_secret: "***************************",
});
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// exports.profileUpdatePhoto = upload.single("photo", (req, res) => {
//   upload.single("photo");
//   console.log("file outside", req.body);
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded." });
//     }
//     console.log("file", req.file);
//     return res("hello");

//     //   // Create a new Photo instance with the metadata
//     //   const newPhoto = new Photo({
//     //     filename: req.file.filename,
//     //     originalname: req.file.originalname,
//     //     // Add other fields as needed
//     //   });

//     //   // Save the photo metadata to MongoDB
//     //   await newPhoto.save();

//     //   // Respond with a success message or any other response data
//     //   res.status(200).json({ message: "File uploaded successfully." });
//   } catch (error) {
//     console.error("Error uploading photo:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// exports.profileUpdatePhoto = (req, res) => {
//   const userId = req.user._id;
//   console.log("user", userId);
//   try {
//     upload.single("photo")(req, res, async (err) => {
//       if (err) {
//         return res.status(400).json({ error: "Error uploading file." });
//       }
//       if (!req.file) {
//         return res.status(400).json({ error: "No file uploaded." });
//       }
//       const buffer = await fs.readFile(req.file.path);
//       const photo = {
//         data: buffer,
//         contentType: req.file.mimetype,
//       };
//       User.findByIdAndUpdate(userId, { photo }, { new: true })
//         .then((updatedUser) => {
//           if (updatedUser) {
//             console.log(`User's name updated to: ${updatedUser.about}`);

//             fs.unlink(req.file.path);
//             res.json(updatedUser);
//           } else {
//             console.log("User not found");
//           }
//         })
//         .catch((error) => {
//           console.error(error);
//         })
//         .finally(() => {
//           fs.unlink(req.file.path);
//         });
//     });
//   } catch (error) {
//     console.error("Error uploading photo:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// exports.profileUpdatePhoto = (req, res) => {
//   const userId = req.user._id;
//   console.log("user", userId);
//   try {
//     upload.single("photo")(req, res, async (err) => {
//       if (err) {
//         return res.status(400).json({ error: "Error uploading file." });
//       }
//       if (!req.file) {
//         return res.status(400).json({ error: "No file uploaded." });
//       }
//       const buffer = await fs.readFile(req.file.path);
//       let imageBufferData = buffer; // Your base64-encoded image data here
//       const imageMimeType = req.file.mimetype;
//       if (typeof imageBufferData !== "string") {
//         imageBufferData = imageBufferData.toString();
//       }

//       const base64Data = imageBufferData.replace(
//         /^data:image\/\w+;base64,/,
//         ""
//       );

//       // Create a buffer from the base64 data
//       const imageBuffer = Buffer.from(base64Data, "base64");

//       // Generate a unique filename for the image (optional)
//       const uniqueFilename = `${Date.now()}.${imageMimeType.split("/")[1]}`;

//       // Write the buffer data to a file
//       fs.writeFile(uniqueFilename, imageBuffer, "binary", (err) => {
//         if (err) throw err;
//         console.log("Image has been saved to", uniqueFilename);
//       });

//       const photo = {
//         data: uniqueFilename,
//         contentType: imageMimeType,
//       };

//       User.findByIdAndUpdate(userId, { photo }, { new: true })
//         .then((updatedUser) => {
//           if (updatedUser) {
//             console.log(`User's name updated to: ${updatedUser.photo}`);

//             res.json(updatedUser);
//             // fs.unlink(req.file.path);
//           } else {
//             console.log("User not found");
//           }
//         })
//         .catch((error) => {
//           console.error(error);
//         })
//         .finally(() => {
//           fs.unlink(req.file.path);
//         });
//     });
//   } catch (error) {
//     console.error("Error uploading photo:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_KEY,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

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
                console.error("Error uploading image to Cloudinary:", error);
                reject(error);
              } else {
                console.log("Image uploaded to Cloudinary:", result);
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
        res.json(updatedUser);
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
