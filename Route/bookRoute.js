const { getAllBooks, AddBook, getSingleBook, updateBook, deleteBook } = require("../Controller/bookController")

const router = require("express").Router()


router.route("/book").get(getAllBooks).post(AddBook)
router.route("/book/:id").get(getSingleBook).patch(updateBook).delete(deleteBook)


module.exports = router