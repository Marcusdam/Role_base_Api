const mongoose = require('mongoose');
const dotenv = require('dotenv').config()

const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(`Database is connected`)

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports =dbConnect