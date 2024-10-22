const { registerUser } = require("../../Controller/auth/authController")

const router = require("express").Router()

router.route("/register").post(registerUser)

module.exports = router