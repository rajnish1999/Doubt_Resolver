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

module.exports = router; 