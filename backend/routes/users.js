const router = require("express").Router();
var thoughtController = require("../controllers/thoughtController");

function isLoggedIn(req, res, next) {
    req.user ? next() : null
    // req.user is determined to be falsy when GET/POST req is made on localhost:3000 (react)
    // middleware isLoggedIn returns null, not next(). Application stops
    // How do I retrieve the passed req.user obj from the front end???
}

function reqUser(req, res, next) {
    console.log("req.user: " + JSON.stringify(req.user));
    next();
}

router.get("/", reqUser, thoughtController.thought_board_get);

router.post("/", reqUser, thoughtController.create_thought_post);

router.get("/check_requser", (req, res) => { 
    res.json(req.user)
})

module.exports = router;
