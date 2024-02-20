const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    isPublished: { type: Boolean, default: false }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
