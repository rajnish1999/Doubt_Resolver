const express = require('express')
const path = require('path')
require('dotenv').config()

require('./database/db')
const User = require('./database/models/user')
const Question = require('./database/models/question')
const Answer = require('./database/models/answer')
const Comment = require('./database/models/comment')

const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'))

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.get('/', async (req, res) => {
    let questionArr = await Question.find({})
    let answerArr = await Answer.find({})
    let commentArr = await Comment.find({})
    res.render('landingPage', {
        questionArr,
        answerArr,
        commentArr
    })
})

app.post('/', async (req, res) => {

    console.log(req.body);
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

const port = process.env.PORT || 5000

app.listen(port, (res) => {
    console.log(`Server is running at http://localhost:${port}`);
})