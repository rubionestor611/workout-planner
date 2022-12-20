const router = require('express').Router();
let {Workout, workoutSchema} = require('../models/workout.model');
const fs = require('fs');
var multer = require('multer');
const upload = require('../middleware/uploadMiddleware');
const {promisify} = require('util');
const unlinkAsync = promisify(fs.unlink);
var path = require('path');

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
    var imgPath = __dirname + '/../middleware/temp/';
    var img = fs.readFileSync(path.join(imgPath + req.file.filename));

    //var encode_img = img.toString('base64');

    final_img = {
      contentType: req.file.mimetype,
      data: img
    }
  }else{
    console.log('no image exists in this upload. Maybe the team wants to have a default picture?');
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

  if(req.file){
     await unlinkAsync(req.file.path);
  }
});

//------UPDATE-----//
router.route('/:id').patch(async (req,res) => {
  const id = req.params.id;
  const {title,description,img,exercises,location,recurrence,scheduledDate,dateOfCompletion} = req.body;

  const workout = await Workout.findById(id);
  if(!workout)
  {
    return res.status(400).send({Error: `Workout ${id} does not exist!`});
  }

  if(title) {workout.title = title;}
  if(description) {workout.description = description;}
  if(img) {workout.img = img;}
  if(exercises) {workout.exercises = exercises;}
  if(location) {workout.location = location;}
  if(recurrence) {workout.recurrence = recurrence;}
  if(scheduledDate) {workout.scheduledDate = scheduledDate;}
  if(dateOfCompletion) {workout.dateOfCompletion = dateOfCompletion;}

  await workout.save((err,newWorkout) => {
    if (err) return res.status(400).send(err);
    res.status(200).json(newWorkout);
  });
});

//------DELETE-----//
router.route('/:id').delete((req,res) => {
  Workout.findByIdAndDelete(req.params.id)
    .then(deletion => res.json(`Workout ${deletion.title} deleted!`))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;