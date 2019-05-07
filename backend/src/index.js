//Config
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

//API routes
const usersRoute = require('./routes/users')

//Application
app.use(bodyParser.json());
app.use(usersRoute);
app.use(express.static('./../public'));

//404 - Not found
app.use((req, res, next) => {
    res.status(404).send('No results found');
});

//500 - Server error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong');
});

//Listen
app.listen(port, () => console.log('Listening to port ' + port));