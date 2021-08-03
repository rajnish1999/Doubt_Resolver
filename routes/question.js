const express = require('express');
const router = express.Router();

const Question = require('../database/models/question')
const Answer = require('../database/models/answer')
const Comment = require('../database/models/comment')
const isAuth = require('./authMiddleware');

router.post('/addQuestion', isAuth, async (req, res) => {

    const quesText = req.body.qt

    const newQuestion = new Question({
        "description": quesText
    })
    const data = await newQuestion.save()

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