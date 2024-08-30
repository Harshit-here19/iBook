const express = require("express")
const Note = require("../models/Note")
const fetchuser = require("../middleware/fetchuser")
const { body, validationResult } = require("express-validator");

const router = express.Router()
//* ROUTE 1 : Get All the Notes using: GET "/api/notes/fetchallnotes". Login Required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }).sort({ date: -1 });

        res.json({ notes, success: true })
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal server error")
    }
})

//* ROUTE 2 : Add a new Note using: POST "/api/notes/addnote". Login Required
router.post('/addnote', fetchuser, [
    body('title', 'enter a valid title.').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 character.').isLength({ min: 5 }),
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array(), success: false });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();

        res.json({ savedNote, success: true })
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal server error")
    }
})

//* ROUTE 3 : Update an existing Note using: PUT "/api/notes/updatenote". Login Required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {

        //TODO: Create a new title object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //TODO: Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") };

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("You are not Authorized")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note, success: true });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ "error": "Internal Server Error", success: false })
    }

})

//* ROUTE 4 : Delete an existing Note using: DELETE "/api/notes/deletenote". Login Required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        //TODO: Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") };

        // Allow deletetion only if the user own the notes
        //? here req.user.id has been came from the jwt token that has been issued after the login
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("You are not Authorized")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "message": "Note has been deleted!", success: true });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ "error": "Internal Server Error", success: false })
    }


})

module.exports = router