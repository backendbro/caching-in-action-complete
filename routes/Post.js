const express = require('express');
const router = express.Router();

const {
  getPosts,
  addPostView, 
  addPost, 
  viewPost
} = require('../controller/Post')

router.get('/dashboard', getPosts)
router.get('/add-post', addPostView)
router.get('/post/:id', viewPost)
router.post('/add-post', addPost)

module.exports = router;