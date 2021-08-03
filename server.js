const express = require('express')
const path = require('path')
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config()

require('./database/db')
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
        saveUninitialized: true
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req,res, next) => {
    console.log(req.session);
    console.log(req.isUnauthenticated());
    next();
})
app.use(flash());

app.get('/', async (req, res) => {
    // delete req.session;
    console.log(req.session)
    let questionArr = await Question.find({})
    let answerArr = await Answer.find({})
    let commentArr = await Comment.find({})
    res.render('landingPage', {
        questionArr,
        answerArr,
        commentArr
    })
})

app.use(quesRoute);
app.use(ansRoute);
app.use(commentRoute);
app.use(userRoute);

const port = process.env.PORT || 5000

app.listen(port, (res) => {
    console.log(`Server is running at http://localhost:${port}`);
})