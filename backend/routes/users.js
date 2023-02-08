const router = require("express").Router();
var thoughtController = require("../controllers/thoughtController");
var userController = require("../controllers/userController");

function isLoggedIn(req, res, next) {    
    req.user ? next() : console.log("No req.user")
}

router.get("/get_profile/:id", isLoggedIn, userController.profile_get);

router.get("/get_profile_image/:id", isLoggedIn, userController.profile_image_get);

router.put("/upload_profile_image", isLoggedIn, userController.profile_image_put);

router.get("/get_buddies", isLoggedIn, userController.get_buddies);

router.post("/add_buddy", isLoggedIn, userController.add_buddy_post);

router.get("/browse_buddies", isLoggedIn, userController.browse_buddies_get)

module.exports = router;
