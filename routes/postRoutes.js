const express = require('express');
const router = express.Router();

const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  createComment,
  deleteComment
} = require('../controllers/postController'); // Import controllers for posts and comments

// Apply JWT middleware to all routes below


// Routes for posts
router.get('/posts', getPosts);
router.get('/posts/:postId', getPostById);
router.post('/posts', createPost);
router.put('/posts/:postId', updatePost);
router.delete('/posts/:postId', deletePost);

// Routes for comments
router.post('/posts/:postId/comments', createComment);
router.delete('/posts/:postId/comments/:commentId', deleteComment);

module.exports = router;
