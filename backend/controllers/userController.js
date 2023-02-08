const User = require("../models/user");
const Thought = require("../models/thought");
const { body, validationResult } = require('express-validator');
const passport = require("passport");
const mongoose = require("mongoose");

const API_SECRET = process.env.API_SECRET
const API_KEY = process.env.API_KEY
const UPLOADPRESET = process.env.UPLOAD_PRESET
const CLOUDNAME = process.env.CLOUD_NAME

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
  
  exports.browse_buddies_get = (req, res, next) => {
    // Get random () users who are NOT in req.user.buddies AND NOT req.user
    // Limit to 6
    // (Later this will be changed to get users algorithmically)
    User.find({ $and : [{ _id: { $ne : req.user._id }}, { _id: { $nin : req.user.buddies }}] })
    .limit(6)
    .exec(function (err, users){
      if (err) { return next(err) };
      let response = users.map(
        user => ({ 
          _id: user._id, 
          profile_pic: user.profile_pic,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          buddies: user.buddies
        })
      )
      res.json(response);
      }
    )
  }