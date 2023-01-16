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

router.get("/get_thoughts", thoughtController.thoughts_get);

router.get("/get_more_thoughts", thoughtController.more_thoughts_get);

router.post("/create_thought", isLoggedIn, thoughtController.create_thought_post);

router.delete("/delete_thought", thoughtController.delete_thought_delete);

router.get("/get_profile/:id", thoughtController.profile_get);

router.get("/get_profile_image/:id", thoughtController.profile_image_get);

router.put("/upload_profile_image", thoughtController.profile_image_put);

router.get("/get_buddies", thoughtController.get_buddies);

// Used for development
router.get("/check_requser", isLoggedIn, reqUser, (req, res) => { 
    res.json(req.user);
})

module.exports = router;
