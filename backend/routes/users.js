const router = require("express").Router();
var thoughtController = require("../controllers/thoughtController");

function isLoggedIn(req, res, next) {    
    req.user ? next() : console.log("No req.user")
}

router.get("/get_profile/:id", isLoggedIn, thoughtController.profile_get);

router.get("/get_profile_image/:id", isLoggedIn, thoughtController.profile_image_get);

router.put("/upload_profile_image", isLoggedIn, thoughtController.profile_image_put);

router.get("/get_buddies", isLoggedIn, thoughtController.get_buddies);

router.post("/add_buddy", isLoggedIn, thoughtController.add_buddy_post);

router.get("/browse_buddies", isLoggedIn, thoughtController.browse_buddies_get)

module.exports = router;
