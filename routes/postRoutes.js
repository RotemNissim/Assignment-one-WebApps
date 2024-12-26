const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// Add a New Post
router.post('/posts', async (req, res) => {
    try {
        const post = new Post(req.body);
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get All Posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a Post by ID
router.get('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).send('Post not found');
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Posts by Sender
router.get('/posts', async (req, res) => {
    const { sender } = req.query;
    if (!sender) return res.status(400).send('Sender ID is required');
    try {
        const posts = await Post.find({ sender });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a Post
router.put('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) return res.status(404).send('Post not found');
        res.json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
