const router = require("express").Router();
var thoughtController = require("../controllers/thoughtController");

function isLoggedIn(req, res, next) {    
    req.user ? next() : console.log("No req.user")
}

router.get("/get_thoughts", isLoggedIn, thoughtController.thoughts_get);

router.get("/get_more_thoughts", isLoggedIn, thoughtController.more_thoughts_get);

router.post("/create_thought", isLoggedIn, thoughtController.create_thought_post);

router.delete("/delete_thought", isLoggedIn, thoughtController.delete_thought_delete);

module.exports = router;