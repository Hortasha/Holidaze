const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

//Desktop location: C:\MongoDB\Server\4.0
//Desktop dev env
const server = 'localhost';
const database = 'holidaze';
//const user = 'martin';
//const password = 'Kalle123';

mongoose.connect(`mongodb://${server}/${database}`, { useNewUrlParser: true });

module.exports = mongoose;