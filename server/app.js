var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ionicPushServer = require('ionic-push-server');
 
var credentials = {
  IonicApplicationID : "b1810f64",
  IonicApplicationAPIsecret : "cc5aa6ad2df0f36140009988fbb4d9f50952d4ddd829806b"
};
var tok = {};

function notify(who, msg) {
  if (!tok[who]) return;
  var notification = {
    "tokens":[tok[who]],
    "notification":{
      "alert":msg.title,
      "ios":{
        "badge":1,
        "sound":"chime.aiff",
        // "expiry": 1423238641,
        "priority": 10,
        "contentAvailable": true,
        "payload":msg.data
      },
      "android":{
        "badge":1,
        "sound":"chime.aiff",
        // "expiry": 1423238641,
        "priority": 10,
        "contentAvailable": true,
        "payload":msg.data
      }
    } 
  };
   
  ionicPushServer(credentials, notification);  
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
function allowCrossDomain(req, res, next) {
  var origin = req.headers.origin;
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  if (origin) res.setHeader('Access-Control-Allow-Origin', origin);
  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
}
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(allowCrossDomain);
app.use(express.static(path.join(__dirname, 'public')));

app.post('/reg', function (req, res) {
  tok[req.body.type] = req.body.token;
  res.send('ok');
});
app.get('/', function (req, res) {
  res.send(tok);
})
app.post('/notification', function (req, res) {
  res.send("ok");
})

app.post('/notify', function (req, res) {
  notify(req.body.who, req.body.msg);
  res.send("ok");
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
