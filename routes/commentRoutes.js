const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// Add a New Comment
router.post('/comments', async (req, res) => {
    try {
        const comment = new Comment(req.body);
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get All Comments
router.get('/comments', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a Comment by ID
router.get('/comments/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) return res.status(404).send('Comment not found');
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Comments by Post ID
router.get('/comments', async (req, res) => {
    const { postId } = req.query;
    if (!postId) return res.status(400).send('Post ID is required');
    try {
        const comments = await Comment.find({ postId });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a Comment
router.put('/comments/:id', async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!comment) return res.status(404).send('Comment not found');
        res.json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a Comment
router.delete('/comments/:id', async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) return res.status(404).send('Comment not found');
        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
