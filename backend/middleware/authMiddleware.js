import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                // get token from header
                token = req.headers.authorization.split(' ')[1];

                // verify token
                const decoded = jwt.verify(token, process.env.JWT_SECRET);

                // get user from token
                req.user = await User.findById(decoded.id).select('-password');

                next();
                
            } catch (error) {
                res.status(401).json({ message: 'Not authorized'});
                throw new Error('Not authorized');
            }
        }

        if (!token) {
            res.status(401).json({ message: 'Not authorized, no token'});
            throw new Error('Not authorized, no token');
        }
    } catch (error) {
        res.status(500);
        throw new Error(error);
    }
}