const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    message: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true } // Reference to the post
});


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;