const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const {sessionOptions} = require('./common/sessionOptions');

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin/_admin');
const leafletRouter = require('./routes/leaflet/leaflet');
const galleryRouter = require("./routes/gallery");

const app = express();
const cc = console.log;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(sessionOptions));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000', 'https://business.jerradjohnson.com', 'http://business.jerradjohnson.com'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

/*app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));*/

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/gallery', galleryRouter);
app.use('/leaflet', leafletRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
