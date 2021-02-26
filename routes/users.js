const express = require("express")
const router = express.Router();
const User = require("../models/user")
const catchAsync = require("../utils/catchAsync")
const passport = require("passport")
const users = require("../controllers/users")



router.route("/register")
.get((req, res) => {
    res.render("users/register")
    })
.post(catchAsync(users.register))



router.route("/login")
.get((req, res) => {
    res.render("users/login")
})
.post(passport.authenticate("local", { failureFlash: true, faulureRedirect: "/login" }), 
users.login)




router.get("/logout", users.logout)



module.exports = router;
