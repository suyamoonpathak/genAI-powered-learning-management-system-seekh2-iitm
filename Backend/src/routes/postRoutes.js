const express = require('express');
const router = express.Router();
const {createPost, getPostDetails, updatePost, deletePost, getAllPostsInThread} = require('../controllers/postController');

router.post('/discussionThreads/:thread_id/posts', createPost);
router.get('/posts/:post_id', getPostDetails);
router.put('/posts/:post_id', updatePost);
router.delete('/posts/:post_id', deletePost);
router.get('/discussionThreads/:thread_id/posts', getAllPostsInThread);

module.exports = router;
