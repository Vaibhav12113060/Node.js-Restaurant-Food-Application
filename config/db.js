const mongoose = require('mongoose');
const colors = require('colors');

// function mongodb database connection

const connectDB = async()=>{
    try{
       await mongoose.connect(process.env.MONGO_URL);
       console.log(`Connected to Database ${mongoose.connection.host}`.bgMagenta)
    }catch(error){
       console.log("DB Error", error,colors.bgRed);
    }
};

module.exports = connectDB;