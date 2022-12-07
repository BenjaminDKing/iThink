const User = require("../models/user");
const Thought = require("../models/thought");
const { body, validationResult } = require('express-validator');
const passport = require("passport");
const mongoose = require("mongoose");

exports.thoughts_get = (req, res, next) => {
  Thought.find({user : req.user._id})
    .sort('-date')
    .exec(function (err, thoughts) {
      if (err) { return next(err) }
      res.json({
        thoughts: thoughts.slice(0, 10),
        totalThoughtCount: thoughts.length  
      });
    })
}

exports.more_thoughts_get = (req, res, next) => {
  const index = req.query.index

  Thought.find({user : req.user._id})
    .sort('-date')
    .exec(function (err, thoughts) {
      if (err) { return next(err) }
      res.json( { thoughts: thoughts.slice( index, index+5 ) } )
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
          } else {
            return res.status(200).json({ 'response': 'Success' });
          }
        })
      }
    }
]

exports.delete_thought_delete = (req, res, next) => {
  
  Thought.findById( req.body.id )
  .exec(function (err, thought) {
    if (err) { return next(err) }
    if (thought.user == req.body.user._id) {
      thought.delete();
      return res.status(200).json({ 'response': 'Success'})
    }
  })
}