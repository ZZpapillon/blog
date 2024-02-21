var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const authRouter = require('./routes/authRoutes');
const commentRouter = require('./routes/commentRoutes');
const postRouter = require('./routes/postRoutes');


const User = require('./models/users');
const Post = require('./models/posts');
const Comment = require('./models/comments');

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = "mongodb+srv://zdes:zdeslav@blog.hay1xt4.mongodb.net/Cluster0?retryWrites=true&w=majority";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/', authRouter);
app.use('/api/', commentRouter);
app.use('/api/', postRouter);


// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message || 'Internal Server Error'
    }
  });
});

module.exports = app;
