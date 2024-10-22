const mongoose = require("mongoose")
const {env} = require("dotenv").config()
exports.connectDatabase = async()=>{
    
// connecting to DB
await mongoose.connect(process.env.MONGO_URI)
// await =  wait till connected to databases
console.log("database connected successfully")
    
}