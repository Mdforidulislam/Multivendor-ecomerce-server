const express = require('express');
const connectDB = require('./src/db/Connection');
const cors = require('cors');
const app = express();
const { router } = require('./src/router/Router');
const bodyParser = require('body-parser');

const port =  process.env.PORT || 5000;

app.use(cors({
    origin: ['http://localhost:5173'], // Specify allowed origin(s)
    optionsSuccessStatus: 200 // Specify the success status for preflight requests
}));

// Parse JSON bodies
app.use(bodyParser.json());
// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router)


app.get('/health',(req,res)=>{
    res.send('ecommerce projec is running ...')
})

// Handle requests for favicon.ico
app.get('/favicon.ico', (req, res) => {
    res.status(204).end(); // No content response for favicon.ico requests
});

// Handle all other routes
app.all('/*', (req, res, next) => {
    const error = new Error(`Cannot find the URL ${req.originalUrl} on the server`);
    error.status = 404;
    next(error);
});

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: {
            message: err.message
        }
    });
});


const main = async ( ) =>{
    await connectDB()
    app.listen(port,()=>{
        console.log('ecommerce website is running ',port);
    })
}

main()


