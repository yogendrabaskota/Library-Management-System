const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bookSchema = new Schema ({
    bookName : {
        type: String
    },
    bookPrice : {
        type : String
    },
    isbnNumber : {
        type : Number
    },
    authorName : {
        type : String
    },
    publishedAt  : {
        type : String
    },
    publication : {
        type : String
    },
    userId : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    }
})

const Book = mongoose.model('Book',bookSchema)
module.exports = Book