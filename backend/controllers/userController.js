const User = require("../models/user");
const Thought = require("../models/thought");
const { body, validationResult } = require('express-validator');
const passport = require("passport");
const mongoose = require("mongoose");
const sha1 = require("sha1");
const axios = require('axios')

const UPLOADPRESET = process.env.UPLOAD_PRESET
const CLOUDNAME = process.env.CLOUD_NAME
const API_SECRET = process.env.API_SECRET
const API_KEY = process.env.API_KEY

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
  
    User.findByIdAndUpdate(req.user._id, 
      { profile_pic: 
        { 
          url: req.body.secure_url,  
          img_id: req.body.public_id 
        } 
      })
    .exec((err, data)=> {
      console.log(data.profile_pic.img_id);
      if (err) {
        console.log(err);
        return next(err);
      } else {
        // deleteImage(data.profile_pic.img_id);
        return res.json({
          'url': req.body.secure_url,
          "img_id": req.body.public_id,
        });
      }
    })
  }

  // DYSFUNCTIONAL
  async function deleteImage(public_id) {

    const timestamp = Date.now();
  
    const data = {
      public_id: public_id,
      timestamp: timestamp,
    }

    var signature = sha1(data + API_SECRET);
    
    payload = {
      // request: data,
      api_key: API_KEY,
      public_id: public_id,
      timestamp: timestamp,
      upload_preset: UPLOADPRESET,
      cloud_name: CLOUDNAME,
      signature: signature,
    } 
  
    axios.post(`https://api.cloudinary.com/v1_1/${CLOUDNAME}/image/destroy`, payload)
      .then(res => console.log(res))
  }
  
  exports.get_buddies = (req, res, next) => {
    
    User.findById(req.user._id)
      .populate('buddies', '_id first_name last_name buddies profile_pic personal_philosophy')
      .exec((err, user) => {  
        if (err) { return next(err) }
        return res.json( { buddies: user.buddies } )
      })
  }
  
  exports.add_buddy_put = (req, res, next) => {

    const user_id = req.user._id;
    const buddy = req.body.buddy_id
    
    if (!req.user.buddies.includes(buddy) ) {
      let user = User.findByIdAndUpdate( user_id, { $push: { buddies: buddy} }, { new: true } )
        .exec( (err, user) => {
          if (err) { return next(err);}
          else { return res.status(200).json({ "response": "Success", "user" : user }) }
        })
    }
  }
  
  exports.remove_buddy_delete = (req, res, next) => {
   
    const user_id = req.user._id;
    const buddy = req.body.buddy_id
    
    User.findByIdAndUpdate( user_id, { $pull: { buddies: buddy} }, { new: true } )
      .exec( (err, user) => {
        console.log(user);
        if (err) { return next(err);}
        else { return res.status(200).json({ "response": "Success", "user" : user }) }
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
          buddies: user.buddies,
          personal_philosophy: user.personal_philosophy
        })
      )
      res.json(response);
      }
    )
  }