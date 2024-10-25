const Book = require("../model/bookModel")


exports.AddBook =async(req,res)=>{
    const userId = req.user.id



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
            userId,
            bookName,
            bookPrice,
            isbnNumber,
            authorName,
            publishedAt,
            publication,

        })
       
        res.status(201).json({

             message : "Book is Successfully added to database"
         })
    

}


exports.getAllBooks = async(req,res)=>{
  
        const books = await Book.find()
    
        res.status(200).json({
            message : "Books fetched successfully",
            data : books
        })
    

}


exports.getSingleBook = async(req,res)=>{
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
}


exports.updateBook = async(req,res) => {
    const { id} = req.params
    const userId = req.user.id

    const { BookName,bookPrice,isbnNumber,authorName,publishedAt,publication } = req.body
    if(!BookName || !bookPrice || !isbnNumber || !authorName || !publication || !publishedAt){
        return res.status(400).json({
            message : "Please provide bookName,bookPrice,isbnNumber,authorName,publishedAt,publication"
        })
    }
  
    const oldDatas = await Book.findById(id).populate('userId','-password')
    if(!oldDatas){
        return res.status(400).json({
            message : "Book not found"
        })
    }
    if(!oldDatas.userId){
        return res.status(400).json({
            message : "User Information Not found"
        })
    }
    if(oldDatas.userId.equals(userId)){
        
    


        await Book.findByIdAndUpdate(id,{
            bookName : BookName,
            bookPrice,
            isbnNumber,
            authorName,
            publishedAt,
            publication,       
        },{
            new:true
        })
        res.status(200).json ({
            message : "Book details updated successfully"
            
        }) 
    }else{
        return res.status(400).json({
            message : "You are not the author"
        })
    }

   
    
}

exports.deleteBook = async(req,res)=>{
    const id = req.params.id
    await Book.findByIdAndDelete(id) //delete the blog with entered API
   
    res.status(200).json({
        message : "Book deleated successfully"
    })
}