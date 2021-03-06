const express = require('express')
const path = require('path')
const session = require('express-session');
const flash = require('connect-flash');
const moment = require('moment')
require('dotenv').config()

require('./database/db')
const isAuth = require('./routes/authMiddleware');
const User = require('./database/models/user')
const Question = require('./database/models/question')
const Answer = require('./database/models/answer')
const Comment = require('./database/models/comment')
const passport = require('./authentication/passportAuth');
const quesRoute = require('./routes/question.js');
const ansRoute = require('./routes/answer.js');
const commentRoute = require('./routes/comment.js');
const userRoute = require('./routes/user');

const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'))

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 24 * 60 * 60
        },
        maxAge: Date.now() + (30 * 86400 * 1000)
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.get('/',isAuth, async (req, res) => {
    // delete req.session;
    // console.log(req.session)
    // if(req.session.viewCount){
    //     req.session.viewCount++;
    // }else{
    //     req.session.viewCount = 1
    // }
    const qFunc = async (question) => {
        await question.populate({
            path: 'creator',
            select: 'username'
        }).execPopulate()
        let newObj = question.toObject();
        newObj.dateAndTime = moment(question.createdAt).format("LLL")
          
        if(req.user){
            if(newObj.upVote.filter((id) => JSON.stringify(id) == JSON.stringify(req.user._id)).length > 0){
                newObj.isUpVote = true;
            }
            if(newObj.downVote.filter((id) => JSON.stringify(id) == JSON.stringify(req.user._id)).length > 0){
                newObj.isDownVote = true;
            }
        }
        return newObj;
       
    }
    const aFunc = async (answer) => {
        await answer.populate({
            path: 'creator',
            select: 'username'
        }).execPopulate()
        let newObj = answer.toObject();
        newObj.dateAndTime = moment(answer.createdAt).format("LLL")
        if(req.user) {
            if(newObj.upVote.filter((id) => JSON.stringify(id) == JSON.stringify(req.user._id)).length > 0){
                newObj.isUpVote = true;
            }
            if(newObj.downVote.filter((id) => JSON.stringify(id) == JSON.stringify(req.user._id)).length > 0){
                newObj.isDownVote = true;
            }
        }
        // console.log("inside a")
        return newObj;
        
    }
    const cFunc = async (comment) => {
        await comment.populate({
            path: 'creator',
            select: 'username'
        }).execPopulate()
        let newObj = comment.toObject();
        newObj.dateAndTime = moment(comment.createdAt).format("LLL")
        if(req.user) {
            if(newObj.upVote.filter((id) => JSON.stringify(id) == JSON.stringify(req.user._id)).length > 0){
                newObj.isUpVote = true;
            }
            if(newObj.downVote.filter((id) => JSON.stringify(id) == JSON.stringify(req.user._id)).length > 0){
                newObj.isDownVote = true;
            }
        }
        // console.log("inside c")
        return newObj;
       
    } 
    let questionArr = await Question.find({})
    let answerArr = await Answer.find({})
    let commentArr = await Comment.find({})

    let newQuesArr = [];
    for(let i=0;i<questionArr.length;i++){
        let data = await qFunc(questionArr[i]);
        newQuesArr.push(data);
    }
    let newAnsArr = [];
    for(let i=0;i<answerArr.length;i++){
        let data = await aFunc(answerArr[i]);
        newAnsArr.push(data);
    }

    let newCommentArr = [];
    for(let i=0;i<commentArr.length;i++){
        let data = await cFunc(commentArr[i]);
        newCommentArr.push(data);
    }
    
    res.render('landingPage', {
        questionArr: newQuesArr,
        answerArr: newAnsArr,
        commentArr: newCommentArr,
        user: req.user
    })
    // res.send("ok")
})

app.use(quesRoute);
app.use(ansRoute);
app.use(commentRoute);
app.use(userRoute);

const port = process.env.PORT || 5000

app.listen(port, (res) => {
    console.log(`Server is running at http://localhost:${port}`);
})
