const router = require("express").Router();
var thoughtController = require("../controllers/thoughtController");

function isLoggedIn(req, res, next) {    
    req.user ? next() : console.log("No req.user")
    // req.user is determined to be falsy when GET/POST req is made on localhost:3000 (react)
    // middleware isLoggedIn returns null, not next(). Application stops
    // How do I retrieve the passed req.user obj from the front end???
}

function reqUser(req, res, next) {
    console.log(req.sessionID);
    console.log("req.user: " +  JSON.stringify(req.user));
    next();
}

router.get("/get_thoughts", isLoggedIn, thoughtController.thoughts_get);

router.get("/get_more_thoughts", isLoggedIn, thoughtController.more_thoughts_get);

router.post("/create_thought", isLoggedIn, thoughtController.create_thought_post);

router.delete("/delete_thought", isLoggedIn, thoughtController.delete_thought_delete);

router.get("/get_profile/:id", isLoggedIn, thoughtController.profile_get);

router.get("/get_profile_image/:id", isLoggedIn, thoughtController.profile_image_get);

router.put("/upload_profile_image", isLoggedIn, thoughtController.profile_image_put);

router.get("/get_buddies", isLoggedIn, thoughtController.get_buddies);

router.post("/add_buddy", isLoggedIn, thoughtController.add_buddy_post);

router.get("/browse_buddies", isLoggedIn, thoughtController.browse_buddies_get)

// Used for development
router.get("/check_requser", isLoggedIn, reqUser, (req, res) => { 
    res.json(req.user);
})

module.exports = router;
