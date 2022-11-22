const router = require('express').Router();
let Exercise = require('../models/exercise.model');
const upload = require('../middleware/uploadMiddleware');
const fs = require('fs');
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
router.route('/:id').patch((req,res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.title = req.body.title;
      exercise.description = req.body.description;
      exercise.img = req.body.img;
      exercise.exerciseType = req.body.exerciseType;
      exercise.exerciseInfo = req.body.exerciseInfo;
      exercise.restTime = req.body.restTime;

      exercise.save()
        .then(() => res.json(`Exercise ${exercise.title} updated`))
        .catch(err => res.status(400).json('Error: ' + err));
    })
      .catch(err => res.status(400).json('Error: ' + err));
});

//------DELETE-----//
router.route('/:id').delete((req,res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(deletion => res.json(`Exercise ${deletion.title} deleted!`))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;