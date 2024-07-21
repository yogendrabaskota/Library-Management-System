const express = require("express")
const { connectDatabase } = require("./database/database")
const Book = require("./model/bookModel")
const app = express()


connectDatabase()

app.use(express.json())  
app.get("/",(req,res)=>{
    res.status(200).json({
        message: "success"
    })
})

app.post("/book",async(req,res)=>{
    //console.log(req.body)
    const bookName = req.body.bookName
    const bookPrice = req.body.bookPrice
    const isbnNumber = req.body.isbnNumber
    const authorName = req.body.authorName
    const publishedAt = req.body.publishedAt

    await Book.create ({
        bookName,
        bookPrice,
        isbnNumber,
        authorName,
        publishedAt
    })
    res.status(201).json({
        // status : 201,
         message : "Book is Successfully added to database"
     })
 
})

PORT = 2100
app.listen(PORT, ()=>{
    console.log("NodeJs has started at port ",PORT)
})
