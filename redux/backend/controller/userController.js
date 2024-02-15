import asyncHandler from 'express-async-handler';
import User from '../model/userModel.js';
import generateToken from '../Utils/generateTokens.js';

// @desc Auth user/set token
// route  POST api/users/auth
//@access public
const authUser = asyncHandler(async (req,res) => {

    const { email,password } = req.body;

    const user = await User.findOne({email});

    let users;
    if(user.role==='admin'){
        users = await User.find();
    }else{
        users = null;
    }
    

    if(user  && (await user.matchPassword(password))){
        generateToken(res,user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            users
        });
    }else{
        res.status(400);
        throw new Error("Invalid Email or Password");
    }

});

// @desc Register user
// route POST api/users
//@access public
const registerUser = asyncHandler(async (req,res) => {
    const { name, email, password } = req.body;
    
    const UserExists = await User.findOne({email});

    if(UserExists){
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password
    });
    console.log("user",user);

    if(user){
        generateToken(res,user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    }else{
        res.status(400);
        throw new Error("Invalid User data");
    }
    
    
    // res.status(200).json({ message: "Register User"});
});

// @desc Logout user
// route  POST api/users/logout
//@access public
const logoutUser = asyncHandler(async (req,res) => {

    res.cookie('jwt','',{
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: "User Logged Out"});
});

// @desc get user profile
// route  GET api/users/profile
//@access private
const getUserProfile = asyncHandler(async (req,res) => {

    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    res.status(200).json(user);
});

// @desc update profile
// route  PUT api/users/profile
//@access private
const updateUserProfile = asyncHandler(async (req,res) => {

    const user = await User.findById(req.user._id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        })
    }else{
        res.status(404);
        throw new Error('User not Found');
    }
});

// @desc get admin home
// route  GET api/users/admin
//@access private
const adminHome = asyncHandler(async (req,res) => {

    const user = await User.find();
    if(user){
        res.status(200).json(user);
    }else{
        res.status(400);
        throw new Error('No users Found');
    }
    
});


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    adminHome
}