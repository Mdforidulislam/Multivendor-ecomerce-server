const mongoose = require('mongoose');
 require('dotenv').config();

const getConnection = ()=>{
    let connectionURL ;
    if (process.env.NODE_ENV === 'development') {

        connectionURL = process.env.LOCAL_URL;
        connectionURL = connectionURL.replace('<username>',process.env.USER_NAME_DB)
        connectionURL = connectionURL.replace('<password>',process.env.PASSWORD_DB)

    }else{
        connectionURL = process.env.PRODUCTTION_URL;
    }
    return connectionURL;
}
const connectDB = async () => {
    console.log('Connecting....');
    const mongodbUrl = getConnection();

    const connectWithRetry = () => {
        return mongoose.connect(mongodbUrl, { dbName: process.env.DATABASE_NAME })
            .catch(err => {
                console.error('Failed to connect to MongoDB. Retrying...');
                return new Promise(resolve => setTimeout(resolve, 5000))
                    .then(() => connectWithRetry());
            });
    };

    await connectWithRetry();

    console.log('Database connection done');
};


module.exports = connectDB;