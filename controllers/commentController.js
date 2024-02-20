const Comment = require('../models/comments');

exports.getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (error) {
        next(error);
    }
};

exports.getCommentById = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(comment);
    } catch (error) {
        next(error);
    }
};

exports.createComment = async (req, res, next) => {
    try {
        const { message, author } = req.body;
        const postId = req.params.postId; // Get the postId from request params
        const comment = new Comment({ message, author, postId }); // Add postId to the comment object
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        next(error);
    }
};

exports.updateComment = async (req, res, next) => {
    try {
        const { message } = req.body;
        const comment = await Comment.findByIdAndUpdate(req.params.commentId, { message }, { new: true });
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(comment);
    } catch (error) {
        next(error);
    }
};

exports.deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        next(error);
    }
};
