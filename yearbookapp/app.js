require('dotenv').config({ path: '.env' });
const express = require('express');
const path = require('path');
const cors = require('cors');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('./api/models/db');

const index = require('./routes/index');

const apiRoutes = require('./api/routes/index');

const app = express();

app.use((req, res, next) => {
  // set headers to allow cross origin request.
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

const corsOptions = {
  origin: 'http://localhost:4200',
  methods: ['OPTIONS', 'GET', 'PUT', 'POST', 'DELETE'],
  credentials: true
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/', index);
app.use('/api', apiRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

function sendJsonResponse(res, status, content) {
  res.status(status);
  res.json(content);
}

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  sendJsonResponse(res, 500, res.locals.message);
});

module.exports = app;
