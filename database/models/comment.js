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
}, { timestamps: true })

const Comment = model('Comment', CommentSchema)

module.exports = Comment

// const comment = new Comment({
//     "commentText": "this is my comment",
//     "creator": "610a46df5a86f4376b843eb9",
//     "question": "610317cdc2bec7610ae6bf5f",
//     "answer": "6103195830ac02623bdf90ed"
// })

// comment.save().then((data) =>{
//     console.log(data)
// }).catch((err) => {
//     console.log(err)
// })
// const comment1 = new Comment({
//     "commentText": "this is my 1st comment to ans 1 of q 1",
//     "creator": "610a46df5a86f4376b843eb9",
//     "question": "610317cdc2bec7610ae6bf5f",
//     "answer": "6103195830ac02623bdf90ed"
// })

// comment1.save().then((data) =>{
//     console.log(data)
// }).catch((err) => {
//     console.log(err)
// })
// const comment2 = new Comment({
//     "commentText": "this is my 1st comment to ans 2 of q 1",
//     "creator": "610a46df5a86f4376b843eb9",
//     "question": "610317cdc2bec7610ae6bf5f",
//     "answer": "6103af08a8bb618613a51707"
// })

// comment2.save().then((data) =>{
//     console.log(data)
// }).catch((err) => {
//     console.log(err)
// })
// const comment3 = new Comment({
//     "commentText": "this is my 1st comment to ans 3 of q 1",
//     "creator": "610a46df5a86f4376b843eb9",
//     "question": "610317cdc2bec7610ae6bf5f",
//     "answer": "6103af08a8bb618613a51708"
// })

// comment3.save().then((data) =>{
//     console.log(data)
// }).catch((err) => {
//     console.log(err)
// })

