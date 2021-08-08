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
    parentComment: {
        type: ObjectId,
    }
}, { timestamps: true })


const Comment = model('Comment', CommentSchema)

module.exports = Comment

// const comment = new Comment({
//     "commentText": "sub sub sub 111 comment",
//     "creator": "610a46df5a86f4376b843eb9",
//     "question": "610317cdc2bec7610ae6bf5f",
//     "parentComment": "610d1280d17db5d7abce5484"
// })

// comment.save().then((data) =>{
//     console.log(data)
// }).catch((err) => {
//     console.log(err)
// })
