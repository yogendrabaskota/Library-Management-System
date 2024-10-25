const User = require("../../model/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

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
   // console.log("user.email ",userExist)
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
        message : "created successfully "
        
    })
}

exports.loginUser = async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(400).json({
            message : "Please provide email and password"
        })
    }
    const userFound = await User.find({userEmail : email })
    if(userFound.length == 0){
        return res.status(400).json({
            message : "This email is not registered"
        })
    }
    const isMatched = bcrypt.compareSync(password,userFound[0].password)
    if(isMatched){
        const token = jwt.sign({id : userFound[0]._id},process.env.SECRET_KEY,{
            expiresIn : '30d'
        })
    
    res.status(200).json({
        message : "logged In successfullys",
        data : token
    })
}
else{
    res.status(400).json({
        message : "Invalid password"
    })
}
}