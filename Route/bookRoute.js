const { getAllBooks, AddBook, getSingleBook, updateBook, deleteBook } = require("../Controller/bookController")
const catchAsync = require("../middleware/catchAsync")
const isAuthenticated = require("../middleware/isAuthenticated")

const router = require("express").Router()


router.route("/book").get(catchAsync(getAllBooks)).post(isAuthenticated,catchAsync(AddBook))
router.route("/book/:id").get(isAuthenticated,catchAsync(getSingleBook)).patch(isAuthenticated,catchAsync(updateBook)).delete(isAuthenticated,catchAsync(deleteBook))


module.exports = router