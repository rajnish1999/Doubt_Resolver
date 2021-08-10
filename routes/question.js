const express = require('express');
const router = express.Router();

const Question = require('../database/models/question')
const isAuth = require('./authMiddleware');

router.post('/addQuestion', isAuth, async (req, res) => {

    const quesText = req.body.qt

    const newQuestion = new Question({
        "description": quesText
    })
    const data = await newQuestion.save()

    res.redirect('/');
})

router.post('/question/upVote', async (req, res) => {
    console.log(req.body);
    const questionId = req.body.id;
    let isSame=false;
    try {
        let question = await Question.findById(questionId);
        if(question.upVote.includes(req.user._id)){
            return res.status(400).send("Already liked");
        }
        question.upVote.push(req.user._id);

        if(question.downVote.includes(req.user._id)){
            const index = question.downVote.indexOf(req.user._id);
            const removedEle = question.downVote.splice(index, 1);
            isSame = true;
        }
        await question.save();
        
        let count = {
            upVote: question.upVote.length,
            downVote: question.downVote.length,
            isSame
        }

        res.status(201).json(count);

    } catch(err) {
        throw err;
    }
})

router.post('/question/downVote', async (req, res) => {
    const questionId = req.body.id;
    let isSame = false;
    try {
        let question = await Question.findById(questionId);

        if(question.downVote.includes(req.user._id)) {
            return res.status(400).send('already downVoted')
        }
        
        if(question.upVote.includes(req.user._id)){
            const index = question.upVote.indexOf(req.user._id);
            const removedEle = question.upVote.splice(index, 1);
            isSame = true;
        }

        question.downVote.push(req.user._id);

        await question.save();
        
        let count = {
            upVote: question.upVote.length,
            downVote: question.downVote.length,
            isSame
        }

        
        res.status(201).json(count);
    } catch(err) {
        throw err;
    }
})


module.exports = router;