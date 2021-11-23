const express = require('express');
let router = express.Router(); 
require('dotenv').config();

const { checkedLoggedIn } = require('../../middleware/auth');
const { grantAccess } = require('../../middleware/roles');

// model
const { User } = require('../../models/user_model');


router.route("/register")
.post(async(req,res)=>{
    try {
        // check if email taken
        if(await User.emailTaken(req.body.email)){
            return res.status(400).json({message:'Email already being used'})
        }

        // creating the model
        const user = new User({
            email: req.body.email,
            password: req.body.password
        })

        // generate token
        const token = user.generateToken()
        const doc = await user.save();

        // send email

        // save user and send token with cookie
        res.cookie('x-access-token', token)
        .status(200).send(getUserProps(doc))
    }catch(error) {
        res.status(400).json({message:'Error', error: error})
    }
})

router.route("/signin")
.post(async(req,res)=>{
    try {
        // Find user
        let user = await User.findOne({email: req.body.email})
        if(!user) return res.status(400).json({message:'User not found'})

        // Compare password
        const compare = await user.comparePassword(req.body.password)
        if(!compare) return res.status(400).json({message:'Bad password'})

        // generate token 
        const token = user.generateToken()

        // response
        res.cookie('x-access-token', token)
        .status(200).send(getUserProps(user))
    } catch(error){
        res.status(400).json({message:'Error', error: error})
    }
})

router.route("/profile")
.get(checkedLoggedIn,grantAccess('readOwn','profile'), async (req, res) =>{
    try{
        const permission = res.locals.permission;
        const user = await User.findById(req.user._id)
        if(!user) return res.status(400).json({message:'User not found'})

        res.status(200).json(permission.filter(user._doc)) 
    }
    catch(error){
        if(!user) return res.status(400).send(error)
    }
})
.patch(checkedLoggedIn, grantAccess('updateOwn','profile'), async(req,res) =>{
    try{
        const user = await User.findOneAndUpdate(
            {_id: req.user._id},
            {
                "$set":{
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    age: req.body.age
                }
            },
            { new: true }
        );
        if(!user) return res.json({message: 'User not found'})

        res.status(200).json(getUserProps(user))

    }catch(error){
        res.status(400).json({message:'Problem updating', error:error});
    }
});

router.route("/update_email")
.patch(checkedLoggedIn, grantAccess('updateOwn','profile'), async (req,res)=>{
    try{
        // make sure the user is not adding duplicated email
        if(await User.emailTaken(req.body.newemail)){
            return res.status(400).json({message:'sorry email already in use'})
        }

        const user = await User.findOneAndUpdate(
            {_id: req.user._id, email: req.body.email},
            {
                "$set":{
                    email: req.body.newemail
                }
            },
            {new: true}
        );
        if(!user) return res.status(400).json({message: 'User not found'})
        
        const token = user.generateToken();
        res.cookie('x-access-token',token)
        .status(200).send({email:user.email})

    }catch(error){
        res.status(400).json({message:'Problem updating', error:error});
    }
})

router.route("/isauth")
.get(checkedLoggedIn, async(req, res) => {
    res.status(200).send(getUserProps(req.user))
})


const getUserProps = (user) => {
    return {
        _id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        age: user.age,
        role: user.role
    }
}

module.exports = router;