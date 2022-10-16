const User = require("../models/user");
const Thought = require("../models/thought");
const {
    body,
    validationResult
  } = require('express-validator');
const passport = require("passport");
