const User = require("../../models/user");
const shortId = require("shortid");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
const cookieParser = require("cookie-parser");

const user = require("../../models/user");
const { errorHandler } = require("../../helpers/dbErrorHandler");
const _ = require("lodash");
const { OAuth2Client } = require("google-auth-library");

const sgMail = require("@sendgrid/mail"); // SENDGRID_API_KEY
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.preSignup = (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email: email.toLowerCase() }).then((user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }

    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      {
        expiresIn: "10m",
      }
    );
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Test My English Online account activation link`,
      html: `
      <div style="">
      <link
      rel="stylesheet"
      type="text/css"
      href="css/style.css"
      
    />
      <div class="container" style="";
      margin: 20px auto;
      padding: 20px;
      background-color: #f1f1f1;
      border-radius: 5px;
      color:#ffffffcc;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); text-align:left">
     
      <h1 style="color:#6C757D">Welcome to Test My English Online Community!</h1>
      <hr/>
      <h3 style="">Dear ${name},</h3>
      <p style="">
        Thank you for expressing interest in joining our English learning community.
        We hope you'll find enjoyment and value in the learning journey with us.
      </p>
    
      <p style="">Please click the button below to activate your acccount:</p>
    
      <a
        href="${process.env.CLIENT_URL}/auth/account/activate/${token}"
        class="button"
        style=" display: inline-block;
          padding: 10px 20px;
          margin-top: 20px;
          background-color: #B28900;
          color: #fff;
          text-decoration: none;
          border-radius: 3px;"
      >
        Activate Account
      </a>
    
      <p style="">Best regards,</p>
      <p style="">-Test My English Online team</p>
    </div></div>
      
    `,
    };

    sgMail
      .send(emailData)
      .then((sent) => {
        return res.json({
          message: `Activation link has been sent to ${email}. Please follow the instructions to activate your account.`,
        });
      })
      .catch((error) => {
        console.log("error", error);
        return res.status(400).json({
          error: error,
        });
      });
  });
};

// exports.signup = (req, res) => {
//     // console.log(req.body);
//     User.findOne({ email: req.body.email }).exec((err, user) => {
//         if (user) {
//             return res.status(400).json({
//                 error: 'Email is taken'
//             });
//         }

//         const { name, email, password, photo } = req.body;
//         let username = shortId.generate();
//         let profile = `${process.env.CLIENT_URL}/profile/${username}`;

//         let newUser = new User({ name, email, password, profile, username, photo });
//         newUser.save((err, success) => {
//             if (err) {
//                 return res.status(400).json({
//                     error: err
//                 });
//             }
//             // res.json({
//             //     user: success
//             // });
//             res.json({
//                 message: 'Signup success! Please signin.'
//             });
//         });
//     });
// };

exports.signup = (req, res) => {
  const token = req.body.token;
  if (token) {
    // TempImage.findOne({ name: "Developer" }).exec((err, tempPhoto) => {
    //   if (err || !tempPhoto) {
    //     return res.status(400).json({
    //       error: "Profile Photo not found",
    //     });
    //   } else {
    jwt.verify(
      token,

      process.env.JWT_ACCOUNT_ACTIVATION,
      function (err, decoded) {
        if (err) {
          return res.status(401).json({
            error: "Expired Link. Signup Again",
          });
        }
        // const { photo } = tempPhoto;
        // console.log("BCK: " + photo);
        // console.log("BCKTem: " + tempPhoto);
        const { name, email, password } = jwt.decode(token);
        let username = shortId.generate();
        // let photo = myProfilePhoto();
        let profile = `${process.env.CLIENT_URL}/profile/${username}`;
        const user = new User({
          name,
          email,
          password,
          profile,
          username,
        });
        user
          .save()
          .then(() => {
            res.json({
              message: "Signup Success! Please sign in.",
            });
          })
          .catch((err) => {
            return res.status(401).json({
              error: errorHandler(err),
            });
          });
      }
    );
    //   }
    // });
  } else {
    return res.json({
      message: "Something went wrong. Please try again",
    });
  }
};
exports.signupWithoutPreSignUp = (req, res) => {
  const { name, email, password } = req.body;
  let username = shortId.generate();
  console.log("Sign up without pre", username);
  User.findOne({ email: email.toLowerCase() }).then((person) => {
    if (person) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }
    let profile = `${process.env.CLIENT_URL}/profile/${username}`;
    const user = new User({
      name,
      email,
      password,
      profile,
      username,
    });
    user
      .save()
      .then(() => {
        res.json({
          message: "Signup Success! Please sign in.",
        });
      })
      .catch((err) => {
        return res.status(401).json({
          error: errorHandler(err),
        });
      });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  // check if user exist
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          error: "User with that email does not exist. Please signup.",
        });
      }
      // authenticate
      if (!user.authenticate(password)) {
        return res.status(400).json({
          error: "Email and password do not match.",
        });
      }
      // generate a token and send to client

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.cookie("token", token, { expiresIn: "1d" });
      const { _id, username, name, email, role, photoUrl } = user;

      res.json({
        token,
        user: { _id, username, name, email, role, photoUrl },
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    success: true,
    message: "Signout success",
  });
};

// exports.requireSignin = expressjwt({
//   secret: process.env.JWT_SECRET,
//   algorithms: ["HS256"],
// });

exports.requireSignin = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization.split(" ")[1];

  // Check if the token is missing
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user information to the request for later use
    req.user = decoded;

    // Continue to the next middleware or route
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

exports.authMiddleware = (req, res, next) => {
  const authUserId = req.user._id;
  User.findById({ _id: authUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};

exports.adminMiddleware = (req, res, next) => {
  const adminUserId = req.user._id;

  // console.log("Req token", req);
  User.findById({ _id: adminUserId })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          error: "User not found",
        });
      }

      if (user.role !== 1) {
        return res.status(400).json({
          error: "Admin resource. Access denied",
        });
      }

      req.profile = user;
      next();
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
};

exports.usernameAvailability = (req, res) => {
  // return "hello"
};

exports.canUpdateDeleteBlog = (req, res, next) => {
  const slug = req.params.slug.toLowerCase();
  Blog.findOne({ slug }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    let authorizedUser =
      data.postedBy._id.toString() === req.profile._id.toString();

    if (!authorizedUser) {
      return res.status(400).json({
        error: "You are not authorized",
      });
    }
    next();
  });
};

exports.forgotPassword = (req, res) => {
  const { email } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: "User with that email does not exist",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, {
      expiresIn: "10m",
    });
    const emailData = {
      from: process.env.EMAIL_TO,
      to: email,
      subject: `Password rest Link`,
      html: `
                <p>Please use the following link to reset your password:</p>
                <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
                <hr />
                <p>This email may contain sensitive information</p>
                <p>https://nagamei.com</p>
          `,
    };

    return user.updateOne({ resetPasswordLink: token }, (err, success) => {
      if (err) {
        return res.json({ error: errorHandler(err) });
      } else {
        sgMail
          .send(emailData)
          .then((sent) => {
            return res.json({
              message: `Email has been set to ${email}. Please follow the instructions to reset your password. Link expires in 10 min`,
            });
          })
          .catch((err) => {
            console.log(err);
            // console.log(error.response.body.errors[0].message)
          });
      }
    });
  });
};

exports.resetPassword = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;
  if (resetPasswordLink) {
    jwt.verify(
      resetPasswordLink,
      process.env.JWT_RESET_PASSWORD,
      function (err, decoded) {
        if (err) {
          return res.status(401).json({
            error: "Expired Link. Please try again",
          });
        }
        User.findOne({ resetPasswordLink }, (err, user) => {
          if (err || !user) {
            return res.status(401).json({
              error: "Something went wrong. Please try again",
            });
          }
          const updatedFields = {
            password: newPassword,
            resetPasswordLink: "",
          };
          user = _.extend(user, updatedFields);

          user.save((err, result) => {
            if (err) {
              return res.status(400).json({
                error: errorHandler(err),
              });
            }
            res.json({
              message: `Great! Now you can login with your new password`,
            });
          });
        });
      }
    );
  }
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = (req, res) => {
  const idToken = req.body.tokenId;

  client
    .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID })
    .then((response) => {
      const { email_verified, name, email, jti } = response.payload;

      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (user) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
              expiresIn: "1d",
            });
            res.cookie("token", token, { expiresIn: "1d" });

            const { _id, email, name, role, username } = user;
            return res.json({
              token,
              user: { _id, email, name, role, username },
            });
          } else {
            let username = shortId.generate();
            let profile = `${process.env.CLIENT_URL}/profile/${username}`;
            let password = jti;

            user = new User({
              name,
              email,
              profile,
              username,

              password,
            });
            user.save((err, data) => {
              if (err) {
                return res.status(400).json({
                  error: errorHandler(err),
                });
              }

              const token = jwt.sign(
                { _id: data._id },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
              );
              res.cookie("token", token, { expiresIn: "1d" });
              const { _id, email, name, role, username } = user;
              return res.json({
                token,
                user: { _id, email, name, role, username },
              });
            });
          }
        });
      } else {
        return res.status(400).json({
          error: "Google Login failed. Please try again",
        });
      }
    });
};
