const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function() {
  mongoose
    .connect(
      "mongodb://localhost/manager",
      { useNewUrlParser: true, useCreateIndex: true }
    )
    .then(() => winston.info("Connected to MongoDB..."));
};
