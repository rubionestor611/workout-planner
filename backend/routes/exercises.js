const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req,res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res) => {
  // gather information to add exercise into database
  const title = req.body.title;
  const description = req.body.description;
  const img = req.body.img;
  const exerciseType = req.body.exerciseType;
  const exerciseInfo = req.body.exerciseInfo;
  const restTime = req.body.restTime;
  
  const newExercise = new Exercise({
    title,
    description,
    img,
    exerciseType,
    exerciseInfo,
    restTime
  })

  newExercise.save()
    .then(() => res.json(`Exercise ${newExercise.title} saved!`))
    .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;