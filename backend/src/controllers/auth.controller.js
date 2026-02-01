const userModel = require('../models/user.model.js')
const foodPartnerModel = require('../models/foodpartner.model.js')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')

// Register, login and loguot routes for user

const registerUser = (async(req, res)=>{

    const {fullName, email, password} = req.body
    const isUserAlreadyExists = await userModel.findOne({email})

    if (isUserAlreadyExists){
        return res.status(400).json({
            message:"User already axists"
        })
    }
 
    const hashPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        fullName,
        email,
        password:hashPassword,
    })

    const token = jwt.sign({
        id:user._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "User register successfully",

        user:{
            _id:user._id,
            email: user.email,
            fullName: user.fullName
        }
    })  


})

const loginUser = (async(req, res)=>{
    const {email, password} = req.body
    const user = await userModel.findOne({
        email
    })

    if (!user){
        return res.status(400).json({
            message: "Invslid email or pssword"
        })
        
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid){
        return res.status(400).json({
            message: "Invlid email or password"
        })
    }


    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie('token', token)
    res.status(200).json({
        message:"User logged in successfully",
        user:{
            _id:user._id,
            email:user.email,
            fullName: user.fullName
        }
    })
})

const logoutUser = (async(req, res)=>{
    res.clearCookie('token')
    res.status(200).json({
        message:"User logged out successfully"
    })
})


// Register, login and loguot routes for foodPartner

const registerFoodPartner = (async(req, res)=>{
    const {fullName, email, password} = req.body

    const isPartnerAlreadyExists = await foodPartnerModel.findOne({email})

    if (isPartnerAlreadyExists){
        return res.status(400).json({
            message: "Partner Already Exists"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const newFoodPartner = await foodPartnerModel.create({
        fullName,
        email,
        password: hashPassword
    })
    
    const token = jwt.sign({
        id: newFoodPartner._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "Food Partner registered successfully",

        newFoodPartner:{
            _id: newFoodPartner._id,
            email:newFoodPartner.email,
            fullName:newFoodPartner.fullName
        }
    })
})


const loginFoodPartner = (async(req, res) =>{
    const {email, password} = req.body

    const foodPartner = await foodPartnerModel.findOne({
        email
    })

    if (!foodPartner){
        return res.status(400).json({
          message:"Invalid email or password"  
        })
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password)

    if (! isPasswordValid){
        return res.status(400).json({
            message:"Invalid email, or password"
        })
    }

    const token = jwt.sign({
        id: foodPartner._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token)
    res.status(201).json({
        message:"User logged in successfully",

        foodPartner:{
            id: foodPartner._id,
            email: foodPartner.email,
            fullName: foodPartner.fullName
        }
    }) 
})

const logouFoodPartner = (async(req, res)=>{
    res.clearCookie('token')
    res.status(200).json({
        message:"User logged out successfully"
    })
})



module.exports = {
    // for user
    registerUser,
    loginUser, 
    logoutUser,

    // for foodPartner 
    registerFoodPartner,
    loginFoodPartner,
    logouFoodPartner

}

