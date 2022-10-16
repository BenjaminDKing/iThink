const User = require("../models/user");
const Thought = require("../models/thought");
const { body, validationResult } = require('express-validator');
const passport = require("passport");
const mongoose = require("mongoose");

exports.thought_board_get = (req, res, next) => {
  Thought.find({ user: req.user._id })
    .sort('-date')
    .exec(function (err, thought_board) {
      if (err) { return next(err) }
      console.log(thought_board);
      res.json(thought_board);
    })
}

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
      const currentTime = new Date();

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } else {

        const thought = new Thought(
          {
            user: req.body.user._id,
            title: req.body.title,
            content: req.body.content,
          //category: ...,
            date: currentTime,
          })
        .save(err => {
          if (err) {
            return next(err);
          }
        })
      }
    }
]
