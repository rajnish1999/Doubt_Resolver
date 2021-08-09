const { Schema, model } = require('mongoose')

const QuestionSchema = new Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    upVote: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    downVote: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

// QuestionSchema.methods.toJSON = function() {
//     const question = this
//     console.log("inside toJSON");
//     const qObject = question.toObject();
    
//     qObject.qDateAndTime = moment(qObject.createdAt).format('LLL')
//     console.log(qObject);
//     return qObject
    
// }

const Question = model('Question', QuestionSchema)

module.exports = Question

// const q1 = new Question({
//     "description": "this is second question",
//     "creator": "610310c1ea60c359127f84a6"
// })

// q1.save().then((data) =>{
//     console.log(data)
// }).catch((err) => {
//     console.log(err)
// })

