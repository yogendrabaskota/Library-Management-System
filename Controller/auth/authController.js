const User = require("../../model/adminModel")
const bcrypt = require("bcryptjs")

exports.registerUser = async(req,res) =>{
   // console.log("i am here")
    const {email, phoneNumber, userName, password} = req.body
    if(!email || !phoneNumber || !userName || !password){
        return res.status(400).json({
            message : "Please provide email, phoneNumber, userName, password"
        })
    }
    const userExist = await User.find({userEmail : email})

    //console.log("userEmail ",userEmail)
    console.log("user.email ",userExist)
    if(userExist.length > 0){
        return res.status(400).json({
            message : "This email is already being used"
        })
    }
    await User.create ({
        userName,
        userEmail : email,
        phoneNumber,
        password : bcrypt.hashSync(password,10)
    })
    res.status(200).json({
        message : "database created successfully "
        
    })
}