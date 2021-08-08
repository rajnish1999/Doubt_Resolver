const { Schema, model } = require('mongoose')

const AnswerSchema = new Schema({
    answerText: {
        type: String,
        required: true,
        trim: true
    },
    upVote: {
        type: Number,
        default: 0
    },
    downVote: {
        type: Number,
        default: 0
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{ timestamps: true })


const Answer = model('Answer', AnswerSchema)

module.exports = Answer

// const ans = new Answer({
//     "answerText": "this is my first ans to second q",
//     "creator": "610310c1ea60c359127f84a6",
//     "question": "6103ae9cca965085a3e4deb9"
// })

// ans.save().then((data) =>{
//     console.log(data)
// }).catch((err) => {
//     console.log(err)
// })

// const ans1 = new Answer({
//     "answerText": "this is my third ans to first q",
//     "creator": "610310c1ea60c359127f84a6",
//     "question": "610317cdc2bec7610ae6bf5f"
// })

// ans1.save().then((data) =>{
//     console.log(data)
// }).catch((err) => {
//     console.log(err)
// })

