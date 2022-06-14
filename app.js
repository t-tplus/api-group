require('dotenv').config;
const express = require('express');
const app = express();
const bodyParder = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require("mongoose");

const mapRouters = require('./src/routers/index');
const { NOT_FOUND, DATABASE_CONNECTED } = require('./src/constant/index');

app.use(morgan('dev'));
app.use(bodyParder.urlencoded({ extended: false }));
app.use(bodyParder.json());

app.use(cors());

mongoose
  .connect(
    // Dev
    "mongodb+srv://" + process.env.MONGO_ATALS_USER + ":" +
    process.env.MONGO_ATALS_PW + "@cluster0.uuip7.mongodb.net/" + process.env.MONGO_ATALS_DB + "?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log(DATABASE_CONNECTED);
  });
mapRouters(app)

app.use((req, res, next) => {
  var err = new Error(NOT_FOUND);
  res.statusCode = 404
  res.json({
      error:err.message
  });
});

app.use((req, res, next) => {
  error.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.use(express.json());

module.exports = app;
