const router = require("express").Router();
var thoughtController = require("../controllers/thoughtController");
const thought = require("../models/thought");

function isLoggedIn(req, res, next) {    
    req.user ? next() : console.log("No req.user")
}

// DEPRECATED THOUGHT ROUTES

router.get("/get_thoughts", isLoggedIn, thoughtController.thoughts_get);

router.get("/get_more_thoughts", isLoggedIn, thoughtController.more_thoughts_get);

router.post("/create_thought", isLoggedIn, thoughtController.create_thought_post);

router.delete("/delete_thought", isLoggedIn, thoughtController.delete_thought_delete);

// NEW THOUGHT ROUTES

router.get("/get_thought", isLoggedIn, thoughtController.thought_get);

router.post("/post_thought", isLoggedIn, thoughtController.thought_post);

router.put("/put_thought", isLoggedIn, thoughtController.thought_put);

module.exports = router;