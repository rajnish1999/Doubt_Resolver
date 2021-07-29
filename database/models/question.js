const { Schema, model } = require('mongoose')

const QuestionSchema = new Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    upVote: {
        type: Number,
        default: 0,
    },
    downVote: {
        type: Number,
        default: 0
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const Question = model('Question', QuestionSchema)

// const q1 = new Question({
//     "description": "this is first question",
//     "creator": "610310c1ea60c359127f84a6"
// })

// q1.save().then((data) =>{
//     console.log(data)
// }).catch((err) => {
//     console.log(err)
// })

module.exports = Question