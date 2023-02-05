const User = require("../models/user");
const Thought = require("../models/thought");
const { body, validationResult } = require('express-validator');
const passport = require("passport");
const mongoose = require("mongoose");
var path = require('path');
var sha1 = require('sha1');
const axios = require('axios')

const API_SECRET = process.env.API_SECRET
const API_KEY = process.env.API_KEY
const UPLOADPRESET = process.env.UPLOAD_PRESET
const CLOUDNAME = process.env.CLOUD_NAME

// Authorization needs to be changed from req.user._id to something private

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

  User.findById(req.user._id)
    .select('profile_pic')
    .select('img_id')
    .then((data) => {
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
          deleteImage(data.profile_pic.img_id)
          return res.json({
            'url': req.body.secure_url,
            "img_id": req.body.public_id,
          });
        }
      })
    })
}

async function deleteImage(public_id) {
  

  // const timestamp = Date.now();

  // const data = {
  //   "public_id": public_id,
  //   "upload_preset": UPLOADPRESET,
  //   "cloud_name": CLOUDNAME,
  //   "timestamp": timestamp
  // }
  // var signature = sha1(data + API_SECRET);
  // payload = {
  //   request: data,
  //   signature: signature
  // }

  // axios.post(`https://api.cloudinary.com/v1_1/${CLOUDNAME}/image/delete`, payload)
  //   .then(res => console.log(res))
}

exports.get_buddies = (req, res, next) => {
  
  User.findById(req.user._id)
    .populate('buddies', '_id first_name last_name buddies profile_pic')
    .exec((err, user) => {  
      if (err) { return next(err) }
      return res.json( { buddies: user.buddies } )
    })
}

exports.add_buddy_post = (req, res, next) => {
  // req.body.buddy._id (for buddy being requested)
  // req.user._id (current user id)
  const user_id = req.session.passport.user._id;
  const buddy = req.body.buddy_id

  User.findByIdAndUpdate( user_id, { $addToSet: { buddies: buddy} } )
    .then( (err, user) => {
      if (err) { return next(err) }
      else {
        return res.status(200).json({ "response": "Success" })
      }
    })
}