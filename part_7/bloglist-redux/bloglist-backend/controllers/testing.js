const router = require('express').Router();
const Note = require('../models/blog');
const User = require('../models/user');
const Comment = require('../models/comment');

router.post('/reset', async (request, response) => {
  await Note.deleteMany({});
  await User.deleteMany({});
  await Comment.deleteMany({});

  response.status(204).end();
});

module.exports = router;
