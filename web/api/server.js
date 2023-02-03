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

// GET ALL RECORDS FROM [TABLE]
app.get('/:table', (req, res) => {
    var table = req.params.table;
    pool.query(`SELECT * FROM ${table}`, (err, results) => {
        if (err) {
            log("ERROR", err);
            res.status(500).send(err);
        } else {
            log("SERVER", `${results.length} records sent from ${table} table.`);
            res.status(200).send(results);
        }
    });
});

// LOGINCHECK
app.post('/login', (req, res) => {
    var email = req.body.email,
        username = req.body.username,
        password = req.body.password

    pool.query(`SELECT * FROM users WHERE email=? AND passwd=?`, [email, password], (err, results) => {
        if (err) {
            log("ERROR", err);
            res.status(500).send(err);
        } else {
            log("SERVER", `User details sent from ${table} table.`);
            res.status(200).send(results);
        }
    });
})

// GET RECORD BY ID
app.get('/:table/:id', (req, res) => {
    var table = req.params.table,
        id = req.params.id
    
    pool.query(`SELECT * FROM ${table} WHERE id=?`, [id], (err, results) => {
        if (err) {
            log("ERROR", err);
            res.status(500).send(err);
        } else {
            log("SERVER", `${results.length} records sent from ${table} table.`);
            res.status(200).send(results);
        }
    })
})

function log(req, res) {
    if (debug == 1) {
        var timestamp = moment(new Date()).format('yyyy-MM-DD HH:mm:ss');
        console.log(`[${timestamp}]: ${req} >>> ${res}`);
    }
}