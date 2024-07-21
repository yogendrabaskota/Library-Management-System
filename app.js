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
/*   THis is long process, so i do with object destructuring:
    const bookName = req.body.bookName
    const bookPrice = req.body.bookPrice
    const isbnNumber = req.body.isbnNumber
    const authorName = req.body.authorName
    const publishedAt = req.body.publishedAt
    const publication = req.body.publication  */

// using object destructuring:
    const { bookName,bookPrice,isbnNumber,authorName,publishedAt,publication } = req.body

// creating collection in DB:
    await Book.create ({
        bookName,
        bookPrice,
        isbnNumber,
        authorName,
        publishedAt,
        publication
    })
    res.status(201).json({
        // status : 201,
         message : "Book is Successfully added to database"
     })
 
})
// all read
app.get("/book",async(req,res)=>{
    const books = await Book.find()

    res.status(200).json({
        message : "Books fetched successfully",
        data : books
    })
})

// single read
app.get("/book/:id",async(req,res)=>{
    const id = req.params.id

    const books = await Book.findById(id)  
    if(books){           
        res.status(200).json ({
            message : "book fetched successfully",
            data : books
        })
    }else {
        res.status(404).json ({
            message : "No books found with given ID"
           
        })
    }

 
})


PORT = 2100
app.listen(PORT, ()=>{
    console.log("NodeJs has started at port ",PORT)
})
