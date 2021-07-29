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