// connect to mongodb & listen for requests
const mongoose = require('mongoose') ;

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);

    }catch(err){
        console.log(err);
        process.exit(1) ;
    }
};



module.exports = connectDB ;