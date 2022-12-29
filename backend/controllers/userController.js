import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../models/userModel.js';


// @desc REGISTER NEW USER
export const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // validation
        if(!firstName || !lastName || !email || !password) {
            res.status(400).json({ message: 'Please fill all fields'});
            throw new Error('Please add all Fields');
        }

        // check if user already exists (email)
        const userExists = await User.findOne({email});
        if (userExists) {
            res.status(400).json({ message: 'User already exists'});
            throw new Error('User already exists');
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        // confirm user is created
        if (user) {
            res.status(201).json({
                _id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token: generateToken(user._id)
            })
        }
        else {
            res.status(400).json({ message: 'Invalid user data'});
            throw new Error('Invalid user data');
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc LOGIN/AUTHENTICATE USER
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check email
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token: generateToken(user._id)
            });
        }
        else {
            res.status(400).json({ message: 'Invalid login details'});
            throw new Error('Invalid login details');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '3d'
    })
}