const router = require('express').Router();
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

let User = require('../models/user.model');

//-----POST-----//
router.route('/register').post(async (req,res) =>
{
    const { name, email, password } = req.body;

    if (!name || !email || !password)
    {
        return res.status(400).send({Error: "Please enter all fields!"});
    }

    // Check if user exists
    const emailExists = await User.findOne({email: {$regex: new RegExp("^" + email + "$", "i")}})

    if (emailExists)
    {
        res.status(400);
        return res.status(400).send({Error: "Email already exists!"});
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = new User ({
        name,
        email,
        password: hashedPassword,
        friends: [],
        scheduledWorkouts: [],
        completedWorkouts: [],
        customWorkouts: []
    });

    await user.save((err, newUser) => {
        if (err) return res.status(400).send(err);
        res.status(200).json(newUser);
    })
});

//-----GET-----//
router.route('/login').get(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password)
    {
        return res.status(400).send({Error: "Please enter all fields!"});
    }

    // Check if user exists
    const user = await User.findOne({email: {$regex: new RegExp("^" + email + "$", "i")}})

    if (!user)
    {
        return res.status(400).send({Error: "Email does not exist!"});
    }

    if (await bcrypt.compare(password, user.password))
    {
        return res.status(200).json(user);
    }
    else 
    {
        return res.status(400).send({Error: "Invalid Credentials!"})
    }
});

module.exports = router;