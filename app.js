const express = require("express")
const { connectDatabase } = require("./database/database")

const app = express()



connectDatabase()
app.use(express.json())
app.use(express.urlencoded({extended : true}))


  
app.get("/",(req,res)=>{
    res.status(200).json({
        message: "success"
    })
})


const bookRoute = require("./Route/bookRoute")
const authRoute = require("./Route/auth/authRoute")


app.use("/api",bookRoute)
app.use("/api",authRoute)


const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Port has started at port ${PORT}`)
})
