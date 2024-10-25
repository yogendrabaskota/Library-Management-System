const { registerUser, loginUser } = require("../../Controller/auth/authController")
const catchAsync = require("../../middleware/catchAsync")

const router = require("express").Router()

router.route("/register").post(catchAsync(registerUser))
router.route("/login").post(catchAsync(loginUser))

module.exports = router