const express = require('express');
const router = express.Router();

const Question = require('../database/models/question')
const Answer = require('../database/models/answer')
const Comment = require('../database/models/comment')
const isAuth = require('./authMiddleware');

router.post('/addAnswer', isAuth, async (req, res) => {
    const { ans:newAns, question } = req.body;
    console.log(req.body);

    const ans = new Answer({
        "answerText": newAns,
        "question": question
    })

    const data = await ans.save();
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