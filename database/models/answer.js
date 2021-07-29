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

// const ans = new Answer({
//     "answerText": "this is my answer",
//     "creator": "610310c1ea60c359127f84a6",
//     "question": "610317cdc2bec7610ae6bf5f"
// })

// ans.save().then((data) =>{
//     console.log(data)
// }).catch((err) => {
//     console.log(err)
// })

module.exports = Answer