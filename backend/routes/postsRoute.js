import express from "express";

const router = express.Router();

import { protect } from '../middleware/authMiddleware.js';
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/postsController.js';

// @route GET /journey
// @access PUBLIC 
router.get('/', getPosts);

// @route POST /journey
// @access PRIVATE 
router.post('/', createPost);

// @route PUT /journey/id
// @access PRIVATE 
router.put('/:id', updatePost);

// @route DELETE /journey/id
// @access PRIVATE 
router.delete('/:id', deletePost);

// @route PUT /journey/id/like
// @access public
router.put('/:id/like', likePost)

export default router;