const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const dbRUI = 'mongodb://127.0.0.1/yearbook';
mongoose.connect(dbRUI);
mongoose.connection.on('connected', () => {
  console.log('Connected to ', dbRUI);
});
mongoose.connection.on('error', (error) => {
  console.error('error connecting to ${dbURI} :', error);
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from ', dbRUI);
});


require('./Student');