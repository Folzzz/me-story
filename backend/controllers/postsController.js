
// custom
import mongoose from "mongoose";
import Journey from "../models/journeyModel.js";

// @desc GET ALL POSTS
export const getPosts = async (req, res) => {
    try {
        const journey = await Journey.find().sort({ createdAt: -1 }).lean();

        res.json(journey);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// @desc CREATE NEW POST
export const createPost = async (req, res) => {
    try {
        const { title, message, selectedFile, creator, tags, user } = req.body;
        
        const newJourney = await Journey.create({ title, message, selectedFile, creator, tags, user });

        res.json(newJourney);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// @desc EDIT/UPDATE A POST
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, message, selectedFile, creator, tags } = req.body;
        let journey = await Journey.findById(id).lean();

        // check if journey exist
        if (!journey) {
            res.status(400).json({ message: 'Post does not exist'});
            throw new Error(`Id ${id} doesn't exist`);
        }

        // check for user
        // if (!req.user) {
        //     res.status(401).json({ message: 'User not found'});
        //     throw new Error('User not found');
        // }

        // confirm logged in user matches journey user
        // if (journey.user.toString() !== req.user.id) {
        //     res.status(401).json({ message: 'User not authorized'});
        //     throw new Error('User not authorized');
        // }

        const updatedJourney = { creator, title, message, tags, selectedFile, _id: id };
        await Journey.findByIdAndUpdate(id, updatedJourney, {
            new: true
        });

        res.json(updatedJourney);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// @desc DELETE A POST
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        let journey = await Journey.findById(id).lean();
        
        // check if journey exist
        if(!journey) {
            res.status(400).json({ message: 'Id does not exist'});
            throw new Error(`Id ${id} does not exist`);
        }

        // check for user
        // if (!req.user) {
        //     res.status(401).json({ message: 'User not found'});
        //     throw new Error('User not found');
        // }

        // confirm logged in user matches journey user
        // if (journey.user.toString() !== req.user.id) {
        //     res.status(401).json({ message: 'User not authorized'});
        //     throw new Error('User not authorized');
        // }

        await Journey.findByIdAndDelete(id);
        res.json({ id });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// @desc UPDATE LIKES ON POST
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'Id does not exist'});
            throw new Error(`Id ${id} does not exist`);
        }

        // for reference - make sure user does not like more than once
        // check for user
        // if (!req.user) {
        //     res.status(401).json({ message: 'User not authenticated'});
        //     throw new Error('User not found');
        // }
        
        const journey = await Journey.findById(id);
        // for reference - make sure user does not like more than once
        // const index = journey.likes.findIndex((id) => id === String(req.user));
        // if (index === -1) {
        //     // like the post
        //     journey.likes.push(req.user);
        // }
        // else {
        //     // dislike the post
        //     journey.likes = journey.likes.filter((id) => id !== String(req.user));
        // }
        // const updatedJourney = await Journey.findByIdAndUpdate(id, journey, { new: true });
        
        const updatedJourney = await Journey.findByIdAndUpdate(id, { likeCount: journey.likeCount + 1}, {
            new: true
        });

        res.json(updatedJourney);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}