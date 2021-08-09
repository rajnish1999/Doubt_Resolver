const express = require('express');
const router = express.Router();

const Answer = require('../database/models/answer')
const isAuth = require('./authMiddleware');

router.post('/addAnswer', isAuth, async (req, res) => {
    const { ans:newAns, question } = req.body;
    const ans = new Answer({
        "creator": req.user._id,
        "answerText": newAns,
        "question": question
    })

    const data = await ans.save();
    
    res.redirect('/');
})

router.post('/answer/upVote', async (req, res) => {
    const answerId = req.body.id;
    try {
        let answer = await Answer.findById(answerId);
        if(answer.upVote.includes(req.user._id)){
            return res.send("Already liked");
        }
        answer.upVote.push(req.user._id);

        if(answer.downVote.includes(req,user._id)){
            const index = answer.downVote.findIndex(req.user._id);
            const removedEle = answer.downVote.splice(index, 1);
        }

        await answer.save();
        res.status(201).send("upVote updated successfully")

    } catch(err) {
        throw err;
    }
})

router.post('/answer/downVote', async (req, res) => {
    const answerId = req.body.id;
    try {
        let answer = await Answer.findById(answerId);

        if(answer.downVote.includes(req.user._id)) {
            return res.send('already downVoted')
        }
        
        if(answer.upVote.includes(req.user._id)){
            const index = answer.upVote.findIndex(req.user._id);
            const removedEle = answer.upVote.splice(index, 1);
        }

        answer.downVote.push(req.user._id);
        await answer.save();

        res.status(201).send("downVote updated successfully")
    } catch(err) {
        throw err;
    }
})


module.exports = router; 