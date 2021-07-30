var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var blogDemo1 = require('./routes/blogDemo1');            /**Định nghĩa cho routes cho routes/templateBlogDemo1.js */
var portfolioDemo2 = require('./routes/portfolioDemo2');  /**Định nghĩa cho routes cho routes/portfolioDemo2.js */

// getting-started.js
const mongoose = require('mongoose');   /**include mongoose vào project và mở kết nối để test database trên localhost*/

/**Cấu hình cho session, vì session như cookie, do đó cấu hình ở đây phải đặt dưới cookie và trên app */
var session = require("express-session")  /**Cấu hình session */
var app = express();

/**include mongoose vào project và mở kết nối để test database trên localhost -> kết nối đến database: adminPortfilioDemo2*/
mongoose.connect('mongodb://localhost:27017/adminPortfilioDemo2', {useNewUrlParser: true, useUnifiedTopology: true});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({               /**Cấu hình cho session */
  secret: "educlong bao mat",   /**Đây là mã bản quyền */
  resave: false,
  saveUninitialized: true//,
  // cookie: {secure:true}   /**cấu hình secure này chỉ chạy trên đường dẫn https, http sẽ k chạy đc => bỏ cấu hình này*/
}))

app.use(express.static(path.join(__dirname, 'public')));
app.use("/portfolioDemo2",express.static(__dirname + "/portfolioDemo2"));/*Cấu hình đường dẫn cố định cho project Demo2*/

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/blogDemo1', blogDemo1);                   /**Định nghĩa cho routes cho routes/templateBlogDemo1.js */
app.use('/portfolioDemo2', portfolioDemo2);         /**Định nghĩa cho routes cho routes/portfolioDemo2.js */

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


/**Cấu hình locals để load file từ models ra views, tên locals này là fakeDataPortfolioDemo2, locals này đc */
app.locals.fakeDataPortfolioDemo2 = require("./models/projects.json");  /**require từ file json trong models*/

module.exports = app;
