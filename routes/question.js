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

module.exports = router;