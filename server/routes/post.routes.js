const express = require('express');
const router = express.Router();

const PostController = require('../controllers/post.controller');

// get all posts
router.route('/posts').get(PostController.getPosts);
router.route('/posts/:id').get(PostController.getPostById);
router.route('/posts').post(PostController.addPost);
router.route('/posts/range/:startAt/:limit').get(PostController.getPostsByRange);
module.exports = router;