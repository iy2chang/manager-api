const Joi = require("joi");
const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 1,
    maxlength: 30,
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
    maxlength: 50
  },
  info: {
    type: String
  },
  notes: {
    type: String
  },
  isVip: {
    type: Boolean,
    default: false
  }
});

const Company = mongoose.model("Company", companySchema);

function validateCompany(company) {
  const schema = {
    name: Joi.string()
      .min(1)
      .max(30)
      .required(),
    phone: Joi.string()
      .min(10)
      .max(13),
    address: Joi.string()
      .min(1)
      .max(50),
    info: Joi.string(),
    notes: Joi.string(),
    isVip: Joi.boolean()
  };

  return Joi.validate(company, schema);
}

module.exports = {
  Company,
  companySchema,
  validateCompany
};
