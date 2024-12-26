const express = require('express');
const Post = require('../models/post'); // Assuming you have a Mongoose model for posts

// Create a new router instance
const router = express.Router();

// Get all posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a post by ID
router.get('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get posts by sender
router.get('/posts', async (req, res) => {
    try {
        const { sender } = req.query;
        if (sender) {
            const posts = await Post.find({ sender });
            return res.json(posts);
        }
        res.status(400).json({ error: 'Sender ID is required' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a post
router.put('/posts/:id', async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        if (!updatedPost) return res.status(404).json({ error: 'Post not found' });
        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;