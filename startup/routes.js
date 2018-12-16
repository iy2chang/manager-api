const express = require("express");
const companies = require("../routes/company");
const employees = require("../routes/employee");
const users = require("../routes/user");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/companies", companies);
  app.use("/api/employees", employees);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
