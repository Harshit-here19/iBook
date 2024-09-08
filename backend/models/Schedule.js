const mongoose = require('mongoose')

const ScheduleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    task: {
        type: String,
        required: true
    },
    dates: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: "#7048e8"
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('schedule', ScheduleSchema);