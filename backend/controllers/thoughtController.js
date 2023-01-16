const User = require("../models/user");
const Thought = require("../models/thought");
const { body, validationResult } = require('express-validator');
const passport = require("passport");
const mongoose = require("mongoose");
var path = require('path');

exports.thoughts_get = (req, res, next) => {

  Thought.find({user : req.query.id})
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

  Thought.find({user : req.query.id})
    .sort('-date')
    .skip(index)
    .limit(5)
    .exec(function (err, thoughts) {
      if (err) { return next(err) }
      res.json( { thoughts: thoughts } )
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

exports.profile_get = (req, res, next) => {
  const id = req.params.id;

  try {
    User.findOne({_id: id})
    .exec(function (err, user) {
      if (err) { return next(err) }
      Thought.find({ user : user._id })
      .exec(function (err, thoughts){
        if (err) { return next(err) }
        res.json({ 
          user: user,
        })
      })
    })
  } catch(CastError) { 
    console.log(CastError);
  }
}

exports.profile_image_get = (req, res, next) => {

  User.findOne({_id: req.params.id })
    .exec(function(err, user) {
      if (err) { return next(err) }
      return res.json( { profile_pic : user.profile_pic } )
    })
}

exports.profile_image_put = (req, res, next) => {

  // BEFORE UPDATING (BUG PREVENTION):
  // check that req.body.secure_url and req.body.public_id ARE DEFINED
  
  User.findByIdAndUpdate(req.user._id, 
    { profile_pic: 
      { 
        url: req.body.secure_url,  
        img_id: req.body.public_id 
      } 
    })
  .exec(err => {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      return res.json({
        'reponse': 'Success', 
        'url': req.body.secure_url,
        "img_id": req.body.public_id
      });
    }
  })
}

exports.get_buddies = (req, res, next) => {
  
  User.findById(req.user._id)
    .populate('buddies')
    .exec((err, user) => {
      if (err) { return next(err) }
      return res.json( { buddies: user.buddies } )
    })
}
