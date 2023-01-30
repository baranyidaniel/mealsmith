require('dotenv').config();
const express = require('express'),
    app = express(),
    cors = require('cors'),
    multer = require('multer'),
    moment = require('moment'),
    port = process.env.PORT,
    debug = process.env.DEBUG_MODE

var mysql = require('mysql'),
    pool = mysql.createPool({
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASS,
        database: process.env.DBNAME
    })

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
    log('SERVER', `Listening started on port ${port}.`);
})

function log(req, res) {
    if (debug == 1) {
        var timestamp = moment(new Date()).format('yyyy-MM-DD HH:mm:ss');
        console.log(`[${timestamp}]: ${req} >>> ${res}`);
    }
}