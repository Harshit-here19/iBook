const mongoose = require("mongoose");

const mongoURI = process.env.MONGODB_URI;

const connectToMongo = () => {
    mongoose.connect(mongoURI).then(console.log("Connected to Mongo successfully.."))
}

module.exports = connectToMongo;