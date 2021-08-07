const express = require('express');
const router = express.Router();

const Comment = require('../database/models/comment')
const isAuth = require('./authMiddleware');

router.post('/addComment', isAuth, async (req, res) => {

    if(req.body.parent){
        const { comment:newComment, parent } = req.body;
        const comment = new Comment({
            "parentComment": parent,
            "commentText": newComment
        })
        await comment.save();
    }else {
        const { comment:newComment, question, answer } = req.body;
        const comment = new Comment({
            "commentText": newComment,
            "creator": req.user._id,
            "question": question,
            "answer": answer,
        })
        await comment.save();
    }

    res.redirect('/');
})

module.exports = router; 