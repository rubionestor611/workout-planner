const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Workout = require('./workout.model');

var userSchema = new Schema({
    name:  {
        type: String,
        required: [true, "Please enter your name"],
        unique: false,
        trim: true,
        minlength: 2
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: [true,"This email is already associated with an account"],
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [8, "Password must be atlease 8 characters long"]
    },
    friends: {
        type: [userSchema],
        required: false,
    },
    scheduledWorkouts: {
        type: [Workout],
        required: true
    },
    completedWorkouts: {
        type: [Workout],
        required: true
    },
    customWorkouts: {
        type: [Workout],
        required: false
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;