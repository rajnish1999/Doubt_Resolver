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
    const questionId = req.body.id;
    try {
        let question = await Question.findById(questionId);
        if(question.upVote.includes(req.user._id)){
            return res.send("Already liked");
        }
        question.upVote.push(req.user._id);

        if(question.downVote.includes(req,user._id)){
            const index = question.downVote.findIndex(req.user._id);
            const removedEle = question.downVote.splice(index, 1);
        }

        await question.save();
        res.status(201).send("upVote updated successfully")

    } catch(err) {
        throw err;
    }
})

router.post('/question/downVote', async (req, res) => {
    const questionId = req.body.id;
    try {
        let question = await Question.findById(questionId);

        if(question.downVote.includes(req.user._id)) {
            return res.send('already downVoted')
        }
        
        if(question.upVote.includes(req.user._id)){
            const index = question.upVote.findIndex(req.user._id);
            const removedEle = question.upVote.splice(index, 1);
        }

        question.downVote.push(req.user._id);
        await question.save();

        res.status(201).send("downVote updated successfully")
    } catch(err) {
        throw err;
    }
})


module.exports = router;