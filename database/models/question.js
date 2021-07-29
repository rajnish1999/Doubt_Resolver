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