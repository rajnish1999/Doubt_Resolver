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
    try {
        let comment = await Comment.findById(commentId);
        if(comment.upVote.includes(req.user._id)){
            return res.send("Already liked");
        }
        comment.upVote.push(req.user._id);

        if(comment.downVote.includes(req,user._id)){
            const index = comment.downVote.findIndex(req.user._id);
            const removedEle = comment.downVote.splice(index, 1);
        }

        await comment.save();
        res.status(201).send("upVote updated successfully")

    } catch(err) {
        throw err;
    }
})

router.post('/comment/downVote', async (req, res) => {
    const commentId = req.body.id;
    try {
        let comment = await Comment.findById(commentId);

        if(comment.downVote.includes(req.user._id)) {
            return res.send('already downVoted')
        }
        
        if(comment.upVote.includes(req.user._id)){
            const index = comment.upVote.findIndex(req.user._id);
            const removedEle = comment.upVote.splice(index, 1);
        }

        comment.downVote.push(req.user._id);
        await comment.save();

        res.status(201).send("downVote updated successfully")
    } catch(err) {
        throw err;
    }
})

module.exports = router; 