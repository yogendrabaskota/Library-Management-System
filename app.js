const express = require("express")
const app = express()

app.get("/",(req,res)=>{
    res.status(200).json({
        message: "success"
    })
})

app.get("/books",async(req,res)=>{

    const books = await Book.find()
    if(books.length == 0){
        res.status(404).json({
            message : "Empty books"
        })
    }
    else {
        res.status(200).json({
            message : "books shown successfully"
        })
    }
})

PORT = 2100
app.listen(PORT, ()=>{
    console.log("NodeJs has started at port ",PORT)
})
