const express = require('express');
const router = express.Router();

const Question = require('../database/models/question')
const Answer = require('../database/models/answer')
const Comment = require('../database/models/comment')

router.post('/addComment', async (req, res) => {
    const { comment:newComment, answer } = req.body;

    const comment = new Comment({
        "commentText": newComment,
        "answer": answer,

    })

    await comment.save();
    let questionArr = await Question.find({})
    let answerArr = await Answer.find({})
    let commentArr = await Comment.find({})

    res.render('landingPage', {
        questionArr,
        answerArr,
        commentArr
    })
})

module.exports = router; 