const router = require('express').Router();
let Exercise = require('../models/exercise.model');
let Workout = require('../models/workout.model');

//------GET-----//
router.route('/').get((req,res) => {
  Workout.find()
    .then(workouts => res.json(workouts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Workout.findById(req.params.id)
    .then(workout => res.json(workout))
    .catch(err => res.status(400).json('Error: ' + err))
});

//-----POST-----//
router.route('/add').post((req,res) => {
  // gather information to add workout into database
  const title = req.body.title;
  const description = req.body.description;
  const img = req.body.img;
  const recurrence = req.body.recurrence;
  const scheduledDate = req.body.scheduledDate;
  const dateOfCompletion = req.body.dateOfCompletion;
  const exercises = req.body.exercises;
  const duration = req.body.duration;
  const location = req.body.location;

  const newWorkout = new Workout({
    title,
    description,
    img,
    exercises,
    duration,
    location,
    recurrence,
    scheduledDate,
    dateOfCompletion
  })

  newWorkout.save()
    .then(() => res.json(`Workout ${newWorkout.title} saved!`))
    .catch(err => res.status(400).json('Error: ' + err));

});

//------UPDATE-----//
router.route('/:id').patch((req,res) => {
  Workout.findById(req.params.id)
    .then(workout => {
      workout.title = req.body.title;
      workout.description = req.body.description;
      workout.img = req.body.img;
      workout.exercises = req.body.exercises;
      workout.location = req.body.location;
      workout.recurrence = req.body.recurrence;
      workout.scheduledDate = req.body.scheduledDate;
      workout.dateOfCompletion = req.body.dateOfCompletion;

      workout.save()
        .then(() => res.json(`Workout ${workout.title} updated`))
        .catch(err => res.status(400).json('Error: ' + err));
    })
      .catch(err => res.status(400).json('Error: ' + err));
});

//------DELETE-----//
router.route('/:id').delete((req,res) => {
  Workout.findByIdAndDelete(req.params.id)
    .then(deletion => res.json(`Workout ${deletion.title} deleted!`))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;