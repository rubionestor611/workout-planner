const router = require('express').Router();
let Exercise = require('../models/exercise.model');
const upload = require('../middleware/uploadMiddleware');
const fs = require('fs');
var path = require('path');

//------GET-----//
router.route('/').get((req,res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err))
})

//-----POST-----//
router.route('/add').post(upload.single('image'),async (req,res) => {
  // gather information to add exercise into database
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

  const exerciseType = req.body.exerciseType;
  const exerciseInfo = req.body.exerciseInfo;
  const restTime = req.body.restTime;
  const tags = req.body.tags;
  const muscleGroups = req.body.muscleGroups;

  const newExercise = new Exercise({
    title,
    description,
    img: final_img,
    exerciseType,
    exerciseInfo,
    restTime,
    tags,
    muscleGroups
  })

  newExercise.save()
    .then(() => res.json(`Exercise ${newExercise.title} saved!`))
    .catch(err => res.status(400).json('Error: ' + err));

  if(req.file){
    await unlinkAsync(req.file.path);
  }
});

//------UPDATE-----//
router.route('/:id').patch(async (req,res) => {
  const id = req.params.id;
  const {title,description,img,exerciseType,sets,reps,time,weight,restTime, tags, muscleGroups} = req.body;
  
  const exercise = await Exercise.findById(id);
  if (!exercise)
  {
      return res.status(400).send({Error: `Exercise ${id} does not exist!`});
  }

  if(title) {exercise.title = title;}
  if(description) {exercise.description = description;}
  if(img) {exercise.img = img;}
  if(exerciseType) {exercise.exerciseType = exerciseType;}
  if(sets) {exercise.sets = sets;}
  if(reps) {exercise.reps = reps;}
  if(time) {exercise.time = time;}
  if(weight) {exercise.weight = weight;}
  if(restTime) {exercise.restTime = restTime;}
  if(tags) {exercise.tags = tags;}
  if(muscleGroups) {exercise.muscleGroups = muscleGroups;}

  await exercise.save((err, newExercise)=>{
    if (err) return res.status(400).send(err);
    res.status(200).json(newExercise);
  });
});

//------DELETE-----//
router.route('/:id').delete((req,res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(deletion => res.json(`Exercise ${deletion.title} deleted!`))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;