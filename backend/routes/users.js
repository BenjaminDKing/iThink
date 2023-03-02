const router = require("express").Router();
var userController = require("../controllers/userController");

function isLoggedIn(req, res, next) {    
    req.user ? next() : console.log("No req.user")
}

router.get("/get_profile/:id", isLoggedIn, userController.profile_get);

router.get("/get_profile_image/:id", isLoggedIn, userController.profile_image_get);

router.put("/upload_profile_image", isLoggedIn, userController.profile_image_put);

router.get("/get_buddies", isLoggedIn, userController.get_buddies);

router.put("/add_buddy", isLoggedIn, userController.add_buddy_put);

router.delete("/remove_buddy", isLoggedIn, userController.remove_buddy_delete);

<<<<<<< HEAD
router.get("/get_profile_image", thoughtController.profile_image_get);

router.put("/upload_profile_image", thoughtController.profile_image_put);

// Used for development
router.get("/check_requser", isLoggedIn, reqUser, (req, res) => { 
    res.json(req.user);
})
=======
router.get("/browse_buddies", isLoggedIn, userController.browse_buddies_get)
>>>>>>> buddy-list

module.exports = router;
