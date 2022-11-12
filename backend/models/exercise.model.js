const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var exerciseSchema = new Schema({
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
  exerciseType: {
    type: String,
    enum: ['AMRAP', 'CARDIO', 'SETSXREPS'],
  },
  exerciseInfo:{
    sets:{
      type: Number,
      required: false,
      unique: false
    },
    reps: {
      type: Number,
      required: false,
      unique: false
    },
    time: {
      type: Number,
      required: false,
      unique: false
    },
    weight: {
      type: Number,
      required: false,
      unique: false
    }
  },
  restTime:{
    type: Number,
    required: false,
    unique: false
  },
  tags: {
    type: [{type: String}],
    required: false
  },
  muscleGroups: {
    type: [String],
    required: false
  }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;