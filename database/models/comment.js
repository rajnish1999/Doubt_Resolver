const { Schema, model } = require('mongoose')

const ObjectId = Schema.Types.ObjectId

const CommentSchema = Schema({
    commentText: {
        type: String,
        required: true,
        trim: true
    },
    creator: {
        type: ObjectId,
        ref: 'User'
    },
    question: {
        type: ObjectId,
        ref: 'Question'
    },
    answer: {
        type: ObjectId,
        ref: 'Answer'
    },
    upVote: {
        type: Number,
    },
    downVote: {
        type: Number
    },
})

const Comment = model('Comment', CommentSchema)

// const comment = new Comment({
//     "commentText": "this is my comment",
//     "creator": "610310c1ea60c359127f84a6",
//     "question": "610317cdc2bec7610ae6bf5f",
//     "answer": "6103195830ac02623bdf90ed"
// })

// comment.save().then((data) =>{
//     console.log(data)
// }).catch((err) => {
//     console.log(err)
// })

module.exports = Comment