const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Exercise = require('./exercise.model').schema;

var workoutSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 2
  },
  description: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  img: {
    required: false,
    unique: false,
    data: Buffer,
    contentType: String
  },
  exercises: {
    type: [Exercise],
    required: false,
  },
  duration: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  recurrence: {
    type: Boolean,
    required: true,
  },
  scheduledDate: {
    type: Date,
    required: false,
  },
  dateOfCompletion: {
    type: Date,
    required: false,
  },
  tags: {
    type: [String],
    required: false
  },
  muscleGroups: {
    type: [String],
    required: false
  }
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;