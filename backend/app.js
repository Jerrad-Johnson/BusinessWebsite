var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const ExifReader  = require('exifreader');
const fs = require('fs');

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
  let exifData = [];
  let exifObject = {};
  let formattedExifData = [];
  let exifAsString = "";
  const imagePath = `./public/map_images/macro/`
  const allImageFileNames = await fs.promises.readdir(imagePath);
  exifData = await getAllExifData(imagePath, allImageFileNames);

  for (let entry of exifData){
    exifObject.LensModel = entry.LensModel.value;
    exifObject.fileName = entry.fileName;
    exifObject.LensModel = entry.LensModel.value;
    exifObject.FocalLength = entry.LensModel.value;
    exifObject.DateCreated = entry.DateCreated.value;
    exifObject.ExposureTime = entry.DateCreated.value;
    exifObject.FNumber = entry.FNumber.value;
    exifObject.ISOSpeedRatings = entry.ISOSpeedRatings.value;
    exifObject.OffsetTime = entry.OffsetTime.value;
    exifObject.OffsetTimeOriginal = entry.OffsetTimeOriginal.value;
    exifObject.GPSLatitude = (entry.GPSLatitude.description + " " + entry.GPSLatitudeRef.value[0]);
    exifObject.GPSLongitude = (entry.GPSLongitude.description + " " + entry.GPSLongitudeRef.value[0]);
    exifObject.GPSAltitude = Math.trunc(entry.GPSAltitude.value[0] / 10000 * 3.28084);

    exifAsString = JSON.stringify(exifObject);
    formattedExifData.push(exifAsString);

    for (const prop of Object.getOwnPropertyNames(exifObject)){
      delete exifObject[prop];
    }

  }
    cc(formattedExifData)
}

async function getAllExifData(imagePath, allImageFileNames){
  let entry;
  let exifResults = [];

  for (let fileName of allImageFileNames){
    entry = await ExifReader.load(imagePath + fileName);
    entry.fileName = fileName;
    exifResults.push(entry);
  }

  return exifResults;
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
