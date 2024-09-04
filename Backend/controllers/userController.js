const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

async function registerUser (req, res) {
    console.log(req.body);
    const { name, email, password, mobileNumber, role } = req.body;
    try {
        const exitUser = await User.findOne({email});
        console.log(exitUser);
        if (!exitUser) {
            const user = new User({name, email, password, mobileNumber, role});
            await user.save();
            res.status(201).send({message: 'User registered successfully', success:true});
        } else {
            res.status(200).send({message:'User already exists', success:false});
        }
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};

async function loginUser(req, res) {
    const { email, password } = req.body;
    // console.log(email,password);
    try {
        const user = await User.findOne({ email });
        // console.log(user);
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials', success:false});
        } 
        const payload = { user: { _id: user.id, role:user.role} };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h'});
        res.status(200).send({ token: token, success:true});
    } catch (error) {
        res.status(500).send({error: error.message});
    }
};

async function userInformation (req, res) {
    console.log('****',req.user);
    const id = req.user.id
    try {
    const user = await User.findOne({_id:id});
    console.log(user);
    if(!user){
        res.status(200).send({ message: 'User does not found.',success:false });
    }else{
        res.status(202).send({user:user, success:true})
    }     
    } catch (error) {
        res.status(500).send({ error });
    }

}

module.exports = {
    registerUser,
    loginUser,
    userInformation
}