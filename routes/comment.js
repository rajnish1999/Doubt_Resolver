const express = require('express');
const router = express.Router();

const Comment = require('../database/models/comment')
const isAuth = require('./authMiddleware');

router.post('/addComment', isAuth, async (req, res) => {
    const { comment:newComment, question, answer } = req.body;

    const comment = new Comment({
        "commentText": newComment,
        "creator": req.user._id,
        "question": question,
        "answer": answer,
    })

    await comment.save();

    res.redirect('/');
})

module.exports = router; 