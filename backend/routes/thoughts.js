const router = require("express").Router();
var thoughtController = require("../controllers/thoughtController");
const thought = require("../models/thought");

function isLoggedIn(req, res, next) {    
    req.user ? next() : console.log("No req.user")
}

router.get("/get_thoughts", isLoggedIn, thoughtController.thoughts_get);

router.get("/get_more_thoughts", isLoggedIn, thoughtController.more_thoughts_get);

// NEW THOUGHT ROUTES

router.get("/get_thought", isLoggedIn, thoughtController.thought_get);

router.post("/post_thought", isLoggedIn, thoughtController.thought_post);

router.put("/put_thought", isLoggedIn, thoughtController.thought_put);

router.delete("/delete_thought", isLoggedIn, thoughtController.thought_delete);

module.exports = router;