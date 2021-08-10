const express = require('express');
const router = express.Router();

const Comment = require('../database/models/comment')
const isAuth = require('./authMiddleware');

router.post('/addComment', isAuth, async (req, res) => {

    if(req.body.parent){
        const { comment:newComment, parent } = req.body;
        const comment = new Comment({
            "parentComment": parent,
            "commentText": newComment,
            "creator": req.user._id,
        })
        await comment.save();
    }else {
        const { comment:newComment, answer } = req.body;
        const comment = new Comment({
            "commentText": newComment,
            "creator": req.user._id,
            "answer": answer,
        })
        await comment.save();
    }

    res.redirect('/');
})

router.post('/comment/upVote', async (req, res) => {
    const commentId = req.body.id;
    let isSame = false;
    try {
        let comment = await Comment.findById(commentId);
        if(comment.upVote.includes(req.user._id)){
            return res.send("Already liked");
        }
        comment.upVote.push(req.user._id);

        if(comment.downVote.includes(req.user._id)){
            const index = comment.downVote.indexOf(req.user._id);
            const removedEle = comment.downVote.splice(index, 1);
            isSame = true;
        }

        await comment.save();

        let count = {
            upVote: comment.upVote.length,
            downVote: comment.downVote.length,
            isSame
        }

        
        res.status(201).json(count);

    } catch(err) {
        throw err;
    }
})

router.post('/comment/downVote', async (req, res) => {
    const commentId = req.body.id;
    let isSame = false;
    try {
        let comment = await Comment.findById(commentId);

        if(comment.downVote.includes(req.user._id)) {
            return res.send('already downVoted')
        }
        
        if(comment.upVote.includes(req.user._id)){
            const index = comment.upVote.indexOf(req.user._id);
            const removedEle = comment.upVote.splice(index, 1);
            isSame=true;
        }

        comment.downVote.push(req.user._id);

        await comment.save();
        
        let count = {
            upVote: comment.upVote.length,
            downVote: comment.downVote.length,
            isSame
        }

        
        res.status(201).json(count);
    } catch(err) {
        throw err;
    }
})

module.exports = router; 