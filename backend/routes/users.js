const router = require("express").Router();
var thoughtController = require("../controllers/thoughtController");

function isLoggedIn(req, res, next) {
    req.user ? next() : null
}

router.get("/", thoughtController.thought_board_get);

router.post("/", thoughtController.create_thought_post);

router.get("/check_requser", (req, res) => { 
    res.json(req.user)
})

module.exports = router;
