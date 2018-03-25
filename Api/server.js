var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 3000;

app.set('port', (process.env.PORT || port));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var cars = [{
    id: 0,
    type: 'a4',
    brand: 'audi',
    color: 'black'
},
{
    id: 1,
    type: 'm4',
    brand: 'bmw',
    color: 'white'
}];

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// test
app.get('/', function (req, res) {
    res.json({ message: 'it works...' });
});

// get
app.get('/cars', function (req, res) {
    res.send(cars);
});

// get by id
app.get('/cars/:id', function (req, res) {
    for (var i = 0; cars.length > i; i++) {
        if (cars[i] && cars[i].id.toString() === req.params.id) {
            res.send(cars[i]);
        }
    }
});

// post
app.post('/cars', function (req, res) {
    cars.push({ id: req.body.id, type: req.body.type, brand: req.body.brand, color: req.body.color });

    res.json({ message: 'car created!' });
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});