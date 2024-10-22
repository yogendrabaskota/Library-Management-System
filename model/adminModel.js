const mongoose = require("mongoose")
const Schema = mongoose.Schema
const userSchema = new Schema ({
    userName : {
        type : String
    },
    userEmail : {
        type : String
    },
    phoneNumber : {
        type : Number
    },
    password : {
        type : String
    }

})

const User = mongoose.model('User',userSchema)
module.exports = User