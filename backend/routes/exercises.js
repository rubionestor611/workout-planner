const router = require('express').Router();
let Exercise = require('../models/exercise.model');

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
router.route('/add').post((req,res) => {
  // gather information to add exercise into database
  const title = req.body.title;
  const description = req.body.description;
  const img = req.body.img;
  const exerciseType = req.body.exerciseType;
  const exerciseInfo = req.body.exerciseInfo;
  const restTime = req.body.restTime;
  const tags = req.body.tags;
  const muscleGroups = req.body.muscleGroups;

  const newExercise = new Exercise({
    title,
    description,
    img,
    exerciseType,
    exerciseInfo,
    restTime,
    tags,
    muscleGroups
  })

  newExercise.save()
    .then(() => res.json(`Exercise ${newExercise.title} saved!`))
    .catch(err => res.status(400).json('Error: ' + err));

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