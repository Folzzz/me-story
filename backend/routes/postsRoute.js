import express from "express";

const router = express.Router();

import { protect } from '../middleware/authMiddleware.js';
import { getPosts, getSearchedPosts, createPost, updatePost, deletePost, likePost, getSinglePost, commentPost } from '../controllers/postsController.js';

// @route GET /journey
// @access PUBLIC 
router.get('/', getPosts);

// @route GET /journey/search?searchQuery=&tags=
// @access PUBLIC 
router.get('/search', getSearchedPosts);

// @route GET /journey/id
// @access PUBLIC 
router.get('/:id', getSinglePost);

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

// @route POST /journey/id/comment
// @access public
router.post('/:id/comment', commentPost)

export default router;