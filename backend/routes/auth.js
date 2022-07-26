import express from 'express';
import User from '../models/userModel.js';
import bcyrpt from 'bcryptjs'
import { generateToken } from '../utilis.js';

const authRouter= express.Router();

//Register
authRouter.post("/register", async (req, res) => {
   const newUser =new User({
     username: req.body.username,
     email: req.body.email,
     password: bcyrpt.hashSync(req.body.password),

   });
   try {
    const user = await newUser.save();
    res.status(201).json(user);
   } catch (error) {
     res.status(500).json(error);
   }
});

//login
authRouter.post("/login", async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if(user) {
        if(bcyrpt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user)
            });
            return;
        }
    }
    res.status(401).send({message: 'Invalid Email or Password'});
})

export default authRouter;