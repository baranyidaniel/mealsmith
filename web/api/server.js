require('dotenv').config();
const express = require('express'),
    app = express(),
    cors = require('cors'),
    multer = require('multer'),
    moment = require('moment'),
    fs = require('fs'),
    path = require('path'),
    port = process.env.PORT,
    debug = process.env.DEBUG_MODE,
    token = process.env.TOKEN

var mysql = require('mysql'),
    pool = mysql.createPool({
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASS,
        database: process.env.DBNAME
    })

var storage = multer.diskStorage({
    destination: '../public/uploads/',
    filename: function(req, file, cb) {
        let file_name = file.originalname.replace(path.extname(file.originalname), "") + '-' + Date.now() + path.extname(file.originalname);
        cb(null, file_name);
    }
});

var upload = multer({ storage: storage });

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
    log('SERVER', `Listening started on port ${port}.`);
})

// file upload
app.post('/fileupload', upload.single('file'), (req, res) => {
    log('SERVER', `1 file uploaded (${req.file.filename})`);
    res.status(200).json(req.file);
});

// file delete
app.delete('/filedelete/:table/:id', authorize(), (req, res) => {
    let table = req.params.table;
    let id = req.params.id;
    pool.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, results) => {
        if (err) {
            log("ERROR", err)
            res.status(500).send(err)
        } else {
            if (results[0].filename != '') {
                fs.rm('../public/uploads/' + results[0].filename, (err) => {
                    if (err) {
                        log(req.socket.remoteAddress, err);
                        res.status(500).send(err);
                    }
                });
            }
            res.status(200).json(results[0].filename);
        }
    });
});

// LOGINCHECK
app.post('/login', authorize(), (req, res) => {
    var email = req.body.email;
    var password = req.body.passwd;

    pool.query(`SELECT * FROM users WHERE email=? AND passwd=?`, [email, password], (err, results) => {
        if (err) {
            log("ERROR", err)
            res.status(500).send(err)
        } else {
            log('SERVER', `User info sent from users table (logincheck).`);
            res.status(200).send(results);
        }
    });
});

// selectAll
app.get('/:table', authorize(), (req, res) => {
    var table = req.params.table

    pool.query(`SELECT * FROM ${table}`, (err, results) => {
        if (err) {
            log("ERROR", err)
            res.status(500).send(err)
        } else {
            log("SERVER", `${results.length} records sent from ${table} table.`)
            res.status(200).send(results)
        }
    })
})

// selectByValue
app.get('/:table/:field/:value', authorize(), (req, res) => {
    var table = req.params.table,
        field = req.params.field,
        value = req.params.value
    
    pool.query(`SELECT * FROM ${table} WHERE ${field}='${value}'`, (err, results) => {
        if (err) {
            log("ERROR", err)
            res.status(500).send(err)
        } else {
            log("SERVER", `1 record sent from ${table} table.`)
            res.status(200).send(results)
        }
    })
})

// insert
app.post('/:table', authorize(), (req, res) => {
    var table = req.params.table,
        records = req.body,
        str = 'null',
        str2 = 'ID',
        fields = Object.keys(records),
        values = Object.values(records)

    values.forEach(value => { str += `,'${value}'` })
    fields.forEach(field => { str2 += `,${field}` })

    pool.query(`INSERT INTO ${table} (${str2}) VALUES(${str})`, (err, results) => {
        if (err) {
            log("ERROR", err)
            res.status(500).send(err)
        } else {
            log("SERVER", `${results.affectedRows} records inserted into ${table} table.`)
            res.status(200).send(results)
        }
    })
})

// update
app.patch('/:table/:id', authorize(), (req, res) => {
    var table = req.params.table,
        id = req.params.id,
        records = req.body,
        str = '',
        fields = Object.keys(records),
        values = Object.values(records)

    for (let i = 0; i < fields.length; i++) {
        str += `${fields[i]}='${values[i]}'${i != fields.length - 1 ? ',' : ''}`
    }

    pool.query(`UPDATE ${table} SET ${str} WHERE id=${id}`, (err, results) => {
        if (err) {
            log("ERROR", err)
            res.status(500).send(err)
        } else {
            log("SERVER", `${results.affectedRows} record updated in ${table} table.`)
            res.status(200).send(results)
        }
    })
})

// delete
app.delete('/:table/:field/:value', authorize(), (req, res) => {
    var table = req.params.table,
        field = req.params.field,
        value = req.params.value

    pool.query(`DELETE FROM ${table} WHERE ${field}=${value}`, (err, results) => {
        if (err) {
            log("ERROR", err)
            res.status(500).send(err)
        } else {
            log("SERVER", `${results.affectedRows} records deleted from ${table} table.`)
            res.status(200).send(results)
        }
    })
})

function authorize() {
    return (req, res, next) => {
        if (req.headers.authorization == token) {
            next();
        } else {
            res.status(500).json({ message: 'Illetéktelen hozzáférés!' });
        }
    };
}

function log(req, res) {
    if (debug == 1) {
        var timestamp = moment(new Date()).format('yyyy-MM-DD HH:mm:ss');
        console.log(`[${timestamp}]: ${req} >>> ${res}`);
    }
}