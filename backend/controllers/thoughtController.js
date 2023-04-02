const User = require("../models/user");
const Thought = require("../models/thought");
const { body, validationResult } = require('express-validator');
const passport = require("passport");
const mongoose = require("mongoose");
var path = require('path');
var sha1 = require('sha1');
const axios = require('axios')

exports.thoughts_get = (req, res, next) => {

  Thought.find({user : req.query.id})
    .sort('-date')
    .exec(function (err, thoughts) {
      if (err) { return next(err) }
      res.json({
        thoughts: thoughts.slice(0, 5),
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

exports.thought_delete = (req, res, next) => {

  if (req.user._id == req.body.user) {
    Thought.findByIdAndDelete(req.body.id)
    .exec( (err, thought) => {
      if (err) { return next(err) }
      res.status(200).json(thought);
    })  
  } else {
    console.log("Invalid user");
  }
}

exports.thought_get = (req, res, next) => {
  
  Thought.find({ user: req.query.id })
    .sort('-date')
    .exec(function (err, thoughts) {
      if (err) { return next(err) }
      return res.status(200).json({
        thought: thoughts[0]
      })
    })
}

exports.thought_post = (req, res, next) => {
    const currentTime = new Date();

    const thought = new Thought(
      {
        user: req.user._id,
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        date: currentTime,
      })
      .save((err, thought) => {
        if (err) {
          return next(err);
        } else {
          return res.status(200).json({ 'thought': thought });
        }
      })
  }

exports.thought_put = (req, res, next) => {
  Thought.findByIdAndUpdate( req.body._id, 
    {
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
    })
    .exec((err, thought) => {
      if (err) { 
        return next(err) 
      } else {
        res.status(200).json({"thought" : thought})
      }
    }
  )
}

