const express = require('express');
const router = express.Router();
const { getComments, getCommentById, createComment, updateComment, deleteComment } = require('../controllers/commentController');


router.get('/comments', getComments); // Get all comments
router.get('/comments/:commentId', getCommentById); // Get a specific comment by ID
router.post('/comments',  createComment); // Create a new comment with JWT verification
router.put('/comments/:commentId',  updateComment); // Update an existing comment with JWT verification
router.delete('/comments/:commentId',  deleteComment); // Delete a comment by ID with JWT verification

module.exports = router;

