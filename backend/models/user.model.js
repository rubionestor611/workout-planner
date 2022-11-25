const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let {Workout, workoutSchema} = require('./workout.model');


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
        minlength: [8, "Password must be atleast 8 characters long"]
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    scheduledWorkouts: [workoutSchema],
    completedWorkouts: [workoutSchema],
    customWorkouts: [workoutSchema]
},
{
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;

