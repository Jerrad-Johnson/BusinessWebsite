var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const ExifReader  = require('exifreader');

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin/_admin');

var app = express();
let cc = console.log;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/test', (req, res, next) => {
  getTags();
  next();
});

async function getTags(){
  const tags = await ExifReader.load('./test_images/162A2078.jpg');
  cc(tags.Model.value);
  cc(tags.LensModel.value);
  cc(tags.FocalLength.value);
  cc(tags.DateCreated.value)
  cc(tags.ExposureTime.value)
  cc(tags.FNumber.value)
  cc(tags.ISOSpeedRatings.value)
  cc(tags.OffsetTime.value)
  cc(tags.OffsetTimeOriginal.value)
  cc(tags.GPSLatitude.description, tags.GPSLatitudeRef.value[0])
  cc(tags.GPSLongitude.description, tags.GPSLongitudeRef.value[0]);
  cc(Math.trunc(tags.GPSAltitude.value[0] / 10000 * 3.28084));

}

app.use('/', indexRouter);
app.use('/admin', adminRouter);

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
