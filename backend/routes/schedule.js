const express = require("express")
const Schedule = require("../models/Schedule")
const fetchuser = require("../middleware/fetchuser")
const { body, validationResult } = require("express-validator");

const router = express.Router()
//* ROUTE 1 : Get All the Schedule using: GET "/api/schedule/fetchallschedule". Login Required
router.get('/fetchallschedule', fetchuser, async (req, res) => {
    try {
        const schedule = await Schedule.find({ user: req.user.id }).sort({ date: -1 });

        res.json({ schedule, success: true })
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal server error")
    }
})

//* ROUTE 2 : Add a new Schedule using: POST "/api/schedule/addschedule". Login Required
router.post('/addschedule', fetchuser, [
    body('task', 'enter a valid task.').isLength({ min: 3 }),
    body('dates', 'Choose a Date.').isLength({ min: 1 }),
], async (req, res) => {

    try {
        const { task, dates, color } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array(), success: false });
        }

        const schedule = new Schedule({
            task, dates, color, user: req.user.id
        })
        const savedSchedule = await schedule.save();

        res.json({ savedSchedule, success: true })
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal server error")
    }
})

//* ROUTE 3 : Delete an existing Schedule using: DELETE "/api/schedule/deleteschedule". Login Required
router.delete('/deleteschedule/:id', fetchuser, async (req, res) => {

    try {
        //TODO: Find the schedule to be deleted and delete it
        let schedule = await Schedule.findById(req.params.id);
        if (!schedule) { return res.status(404).send("Not found") };

        // Allow deletetion only if the user own the schedule
        //? here req.user.id has been came from the jwt token that has been issued after the login
        if (schedule.user.toString() !== req.user.id) {
            return res.status(401).send("You are not Authorized")
        }

        schedule = await Schedule.findByIdAndDelete(req.params.id)
        res.json({ "message": "Schedule has been deleted!", success: true });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ "error": "Internal Server Error", success: false })
    }


})

module.exports = router