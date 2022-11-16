const router = require('express').Router();
const fs = require('fs');
let Workout = require('../models/workout.model');
var multer = require('multer');
const upload = require('../middleware/uploadMiddleware');
const {promisify} = require('util');
const unlinkAsync = promisify(fs.unlink);

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
router.route('/add').post(upload.single('image'),async (req,res) => {
  // gather information to add workout into database
  const title = req.body.title;
  const description = req.body.description;

  var final_img = null;

  if(req.file){
    console.log('req.file exists')
    var img = fs.readFileSync(req.file.path);

    var encode_img = img.toString('base64');

    final_img = {
      contentType: req.file.mimetype,
      image: req.file.buffer
    }
  }

  const recurrence = req.body.recurrence;
  const scheduledDate = req.body.scheduledDate;
  const dateOfCompletion = req.body.dateOfCompletion;
  const exercises = req.body.exercises;
  const duration = req.body.duration;
  const location = req.body.location;
  const tags = req.body.tags;
  const muscleGroups = req.body.muscleGroups;

  const newWorkout = new Workout({
    title,
    description,
    img: final_img,
    exercises,
    duration,
    location,
    recurrence,
    scheduledDate,
    dateOfCompletion,
    tags,
    muscleGroups
  })

  newWorkout.save()
    .then(() => res.json(`Workout ${newWorkout.title} saved!`))
    .catch(err => res.status(400).json('Error: ' + err));

  // if(req.file){
  //   await unlinkAsync(req.file.path);
  // }
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