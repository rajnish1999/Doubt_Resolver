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

router.post('/answer/upVote',isAuth, async (req, res) => {
    const answerId = req.body.id;
    let isSame=false;
    try {
        let answer = await Answer.findById(answerId);
        if(answer.upVote.includes(req.user._id)){
            return res.send("Already liked");
        }
        answer.upVote.push(req.user._id);

        if(answer.downVote.includes(req.user._id)){
            const index = answer.downVote.indexOf(req.user._id);
            const removedEle = answer.downVote.splice(index, 1);
            isSame = true;
        }

        await answer.save();
        let count = {
            upVote: answer.upVote.length,
            downVote: answer.downVote.length,
            isSame
        }

       
        res.status(201).json(count);

    } catch(err) {
        throw err;
    }
})

router.post('/answer/downVote',isAuth, async (req, res) => {
    const answerId = req.body.id;
    let isSame = false;
    try {
        let answer = await Answer.findById(answerId);

        if(answer.downVote.includes(req.user._id)) {
            return res.send('already downVoted')
        }
        
        if(answer.upVote.includes(req.user._id)){
            const index = answer.upVote.indexOf(req.user._id);
            const removedEle = answer.upVote.splice(index, 1);
            isSame=true;
        }

        answer.downVote.push(req.user._id);

        await answer.save();
        
        let count = {
            upVote: answer.upVote.length,
            downVote: answer.downVote.length,
            isSame
        }

        
        res.status(201).json(count);
    } catch(err) {
        throw err;
    }
})


module.exports = router; 