const express = require("express");
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser")

const JWT_SECRET = "ILOVEM@M";

//* ROUTE 1 : Create a User using: POST "/api/auth/createuser". No Login Required
router.post('/createuser', [
    //array used used for express - validator, first is the property and second argument is custom msg.
    body('name', 'enter a valid name.').isLength({ min: 3 }),
    body('email', 'enter a valid email.').isEmail(),
    body('password', 'password must be atleat 5 character.').isLength({ min: 5 }),
], async (req, res) => {
    // If there are errors return error with bad request code
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array(), success: false });
    }

    // const user = User(req.body);
    // user.save();
    // res.send(req.body)

    // check whether the user with the same email exist already.
    try {
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ error: "Sorry the user with this email already exist.", success: false, exists:true });
        }
        // securing the password by using hashing

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })
        // .then(user => res.json(user))
        //     .catch(err => res.status(400).json({ error: "please enter a unique Email", message: err.message }))
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);

        // res.json(user)
        res.json({ authtoken, success: true })

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal server error")
    }
})

//* ROUTE 2 : Authenticte the User using: POST "/api/auth/login". No Login Required
router.post('/login', [
    body('email', 'enter a valid email.').isEmail(),
    body('password', 'Password cannot be blank.').exists(),
], async (req, res) => {
    // If there are errors return error with bad request code
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array(), success: false });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials.", success: false });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials.", success: false });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken, success: true })

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal server error")
    }

})

//* ROUTE 3 : Get loggedIn User detail using: POST "/api/auth/getuser". Login Required
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal server error")
    }

})

module.exports = router