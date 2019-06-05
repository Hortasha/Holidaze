//Config
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

//API routes
const usersRoute = require('./routes/users');
const hotelsRoute = require('./routes/hotels');
const contactRoute = require('./routes/contact');

//Cors
app.options('*', cors());
app.use(cors());

//Application
app.use(bodyParser.json());
app.use('/api/users', usersRoute);
app.use('/api/', hotelsRoute);
app.use('/api/', contactRoute);

app.use(express.static('./../public'));

//404 - Not found
app.use((req, res, next) => {
    console.log(req.body);
    res.status(404).send('No results found');
});

//500 - Server error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong');
});

//Listen
app.listen(port, () => console.log('Listening to port ' + port));