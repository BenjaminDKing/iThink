const User = require("../models/user");
const Thought = require("../models/thought");
const {
    body,
    validationResult
  } = require('express-validator');
const passport = require("passport");

exports.create_thought_post = [

    body("title")
    .isString().withMessage("Title must be a string.")
    .isLength({ min: 1, max: 50 }).withMessage("Title must be between 1 and 50 characters.")
    .trim().escape(),

    body("content")
    .isString().withMessage("Message content must be a string.")
    .isLength({ min: 1, max: 500 }).withMessage("Message content must be between 1 and 500 characters.")
    .trim().escape(),

    (req, res, next) => {
      console.log("req.body.user: " + JSON.stringify(req.body.user))
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } else {

        const thought = new Thought(
          {
          }
        )
        .save(err => {
          if (err) {
            return next(err);
          }
        })
      }
    }
]
