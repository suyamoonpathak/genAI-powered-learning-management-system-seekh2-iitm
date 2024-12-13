const { Post } = require('../models');

exports.createPost = async (req, res) => {
  try {
    const { thread_id } = req.params;
    const { author_id, content, created_at } = req.body;
    const post = await Post.create({ thread_id, author_id, content, created_at });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPostDetails = async (req, res) => {
  try {
    const { post_id } = req.params;
    const post = await Post.findByPk(post_id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { post_id } = req.params;
    const { content } = req.body;
    const post = await Post.findByPk(post_id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    post.content = content;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { post_id } = req.params;
    const post = await Post.findByPk(post_id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    await post.destroy();
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllPostsInThread = async (req, res) => {
  try {
    const { thread_id } = req.params;
    const posts = await Post.findAll({ where: { thread_id } });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
