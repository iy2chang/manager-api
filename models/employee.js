const { companySchema } = require("./company");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 1,
    maxlength: 30,
    required: true
  },
  lastName: {
    type: String,
    minlength: 1,
    maxlength: 30,
    required: true
  },
  company: {
    type: companySchema,
    required: true
  },
  phone: {
    type: String,
    minlength: 10,
    maxlength: 13
  },
  address: {
    type: String,
    minlength: 1,
    maxlength: 30,
    required: true
  },
  salary: {
    type: Number
  },
  notes: {
    type: String
  }
});

const Employee = mongoose.model("Employee", employeeSchema);

function validateEmployee(employee) {
  const schema = {
    firstName: Joi.string()
      .min(1)
      .max(30)
      .required(),
    lastName: Joi.string()
      .min(1)
      .max(30)
      .required(),
    companyId: Joi.objectId().required(),
    phone: Joi.string()
      .min(10)
      .max(13),
    address: Joi.string()
      .min(1)
      .max(30)
      .required(),
    salary: Joi.number(),
    notes: Joi.string()
  };

  return Joi.validate(employee, schema);
}

module.exports = {
  Employee,
  validateEmployee
};
