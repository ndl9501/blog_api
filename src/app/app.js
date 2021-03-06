const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
dotenv.config();
const config = require('config');

const { authLimiter } = require("../app/middlewares/rateLimit")

const app = express();

// DEV
const morgan = require('morgan')
app.use(morgan('dev'));
// 
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use("/static", express.static(config.get("app").static_folder));


const database = require("./utils/database");
database.query("select 1", 1, (err, rs) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`db connected`);
    }
})

app.get("/", (req, res) => {
    res.status(200).json({
        "status": "OK",
        "msg": "Welcome to blog API",
        "host": req.headers.host
    })
})

app.use("/v1/auth", authLimiter)

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
        "status": status,
        "msg": "error",
        error: {
            message: error.message
        }
    })
})



module.exports = app;