const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5555;

app.use(cors());
app.use(express.json());
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
console.log("MongoDB database connection established successfully w/ ", uri);
});

const exerciseRouter = require('./routes/exercises');
// const workoutRouter = require('./routes/workouts');
// const userRouter = require('./routes/users');

app.use('/exercises', exerciseRouter);
// app.use('/workouts', workoutRouter);
// app.use('/users', userRouter);

app.listen(port, () => {
console.log(`Server is running on port: ${port}`);
});