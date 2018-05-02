const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const express = require('express');
// const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
// const https = require('https');
// const url = require('url');
const port = 5000;

// var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

// var users = require('./users');

app.post('/api', function (req2, res) {
    // res.send('<h1>Hello Node.js</h1>');
    res.setHeader('Content-Type', 'application/json');
    if(req2.body && (!req2.body.path && !req2.body.token)){
        req2.body = JSON.parse(req2.body);
    }
    if (req2.body && req2.body.path && req2.body.token) {
        var request = require("request");
        console.log('https://api.medium.com' + req2.body.path)
        var options = {
            method: 'GET',
            url: 'https://api.medium.com' + req2.body.path,
            headers: {
                'cache-control': 'no-cache',
                authorization: req2.body.token
            }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            console.log(body);
            var json = JSON.parse(body);
            res.json(json)
        });
        // res.send(`${Date.now()}`);
    } else {
        var json = {
            'message': 'No Request'
        };
        res.json(json)
    }
});

app.get('/user', function (req, res) {
    res.json({
        'id': req.params.id,
        'test': 'tEST'
    });
});

app.get('/user/:id', function (req, res) {
    var id = req.params.id;
    res.json({
        'id': req.params.id,
        'test': 'tEST'
    });
});

app.post('/newuser', function (req, res) {
    var json = req.body;
    res.send('Add new ' + json.name + ' Completed!');
});

app.listen(port, function () {
    console.log('Starting node.js on port ' + port);
});

exports.app = functions.https.onRequest(app);