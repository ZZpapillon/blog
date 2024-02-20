
const Post = require('../models/posts');
const Comment = require('../models/comments');

exports.getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        next(error);
    }
};

exports.getPostById = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        next(error);
    }
};

exports.createPost = async (req, res, next) => {
    try {
        const { title, content, author } = req.body;
        const post = new Post({ title, content, author });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        next(error);
    }
};

exports.updatePost = async (req, res, next) => {
    try {
        const { title, content, author } = req.body;
        const post = await Post.findByIdAndUpdate(req.params.postId, { title, content, author }, { new: true });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        next(error);
    }
};

exports.deletePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        next(error);
    }
};

exports.getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId });
        res.json(comments);
    } catch (error) {
        next(error);
    }
};

exports.createComment = async (req, res, next) => {
    try {
        const { message, author } = req.body;
        const comment = new Comment({ message, author, postId: req.params.postId });
        await comment.save();
        res.status(201).json(comment);
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
