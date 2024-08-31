const mongoose = require('mongoose')
const express = require('express');
const cors = require('cors');
require("dotenv").config();

const app = express();

const corsOptions = {
    origin: 'https://ibook-cloud.onrender.com/',
    // origin: '*',
    credentials: true,
    allowedHeaders: ['Content-Type', 'auth-token']
}

app.use(express.json());
app.use(cors(corsOptions))


// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

mongoose.connect(process.env.MONGODB_URI).then(() => {
    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`Running on port ${port}`)
    })
}).catch(err => {
    console.log(err);
})
