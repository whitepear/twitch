var express = require('express');
require('dotenv').config();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var mysql = require('mysql');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var routes = require('./routes/index.js');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

var pool = mysql.createPool({
	connectionLimit : 10,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,  
  database : 'twitch'
});
 
var sessionStore = new MySQLStore({}, pool);
 
app.use(session({
  key: 'session_cookie_name',
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  resave: true,
  saveUninitialized: false
}));

app.use(function(req, res, next) {
	// make connection pool available throughout server files
	req.pool = pool;
	next();
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
  });
}

app.listen(3000, console.log('Server is running...'));

module.exports = app;
