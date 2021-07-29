const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        trim: true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes(password)){
                throw new Error('Password should not have term password')
            }
        }
    }
}, { 
    timestamps: true 
   }
)

const User = model('User', UserSchema)

module.exports = User