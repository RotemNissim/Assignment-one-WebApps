const Comment = require('../models/comment');

// Get all comments
exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch comments', error });
    }
};

// Get comment by post ID
exports.getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const comment = await Comment.find({ postId });
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch comments for the post', error });
    }
};

// Update a comment
exports.updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedComment = await Comment.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update comment', error });
    }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedComment = await Comment.findByIdAndDelete(id);
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete comment', error });
    }
};

// Create a new comment
exports.createComment = async (req, res) => {
    try {
        const { postId, content, author } = req.body;
        const newComment = await Comment.create({ postId, content, author });
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create comment', error });
    }
};