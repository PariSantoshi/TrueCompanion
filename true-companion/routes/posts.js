const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username');
    res.send(posts);
  } catch (error) {
    res.status(400).send('Error fetching posts');
  }
});

router.post('/', async (req, res) => {
  try {
    const { content } = req.body;
    const post = new Post({ author: req.user.userId, content });
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send('Error creating post');
  }
});

module.exports = router;
