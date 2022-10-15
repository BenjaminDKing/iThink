const router = require("express").Router();
var thoughtController = require("../controllers/thoughtController");

function isLoggedIn(req, res, next) {
    req.user ? next() : null
}

router.get("/", function (req, res, next) {
    res.json({ app_name: "iThink" });
})

router.post("/", isLoggedIn, thoughtController.create_thought_post)

router.get("/check_requser", (req, res) => { 
    res.json(req.user)
})

module.exports = router;
