const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
dotenv.config();

const app = express();

// DEV
const morgan = require('morgan')
app.use(morgan('dev'));
// 
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));


const database = require("./utils/database");
database.getConnection(function (err, connection){
    if(err){
        console.log(err);
        process.exit(1);
    }else{
        console.log("DB connected");
    }
})

app.get("/", (req, res) => {
    res.status(200).json({
        "status": "OK",
        "msg": "Welcome to blog API"
    })
})

app.use(require("../routers/index"))



// catch 404 err
app.use((req, res, next) => {
    const err = new Error("Not Found!");
    err.status = 404;
    next(err);

})


// err handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === "development" ? err : {};
    const status = err.status || 500;
    return res.status(status).json({
        error: {
            message: error.message
        }
    })
})



module.exports = app;