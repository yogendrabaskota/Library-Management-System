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

    const { bookName,bookPrice,isbnNumber,authorName,publishedAt,publication } = req.body

    if(!bookName || !bookPrice || !isbnNumber || !authorName || !publication || !publishedAt){
        return res.status(400).json({
            message : "Please provide bookName,bookPrice,isbnNumber,authorName,publishedAt,publication"
        })
    }
    

    //const isMatched = await Book.find({bookName : bookName})
    //console.log(isMatched)
    
    // if(isMatched.length !== 0){
    //     return res.status(400).json({
    //         message : "Book already exist"
    //     })
    // }

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

//Update
app.patch("/book/:id",async(req,res) => {
    const id = req.params.id

    const { BookName,bookPrice,isbnNumber,authorName,publishedAt,publication } = req.body
    if(!BookName || !bookPrice || !isbnNumber || !authorName || !publication || !publishedAt){
        return res.status(400).json({
            message : "Please provide bookName,bookPrice,isbnNumber,authorName,publishedAt,publication"
        })
    }
  
    await Book.findByIdAndUpdate(id,{
        bookName : BookName,
        bookPrice,
        isbnNumber,
        authorName,
        publishedAt,
        publication,       
    })

    res.status(200).json ({
        message : "Book details updated successfully"

    }) 
})

//Delete

app.delete("/book/:id",async(req,res)=>{
    const id = req.params.id
    await Book.findByIdAndDelete(id) //delete the blog with entered API
   
    res.status(200).json({
        message : "Book deleated successfully"
    })
})



//PORT = 2100
app.listen(3000, ()=>{
    console.log("Port has started at port 2000")
})
