const { Employee, validateEmployee } = require("../models/employee");
const { Company } = require("../models/company");
const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();

// get all employees
router.get("/", async (req, res) => {
  const employees = await Employee.find()
    .select("-__v")
    .sort("name");
  res.send(employees);
});

// get employee by id
router.get("/:id", validateObjectId, async (req, res) => {
  const employee = await Employee.findById(req.params.id).select("-__v");
  if (!employee)
    return res.status(404).send("employee is not found with given ID");

  return res.send(employee);
});

// update employee by id
router.put("/:id", [validateObjectId, auth], async (req, res) => {
  const { error } = validateEmployee(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const company = await Company.findById(req.body.companyId);
  if (!company) return res.status(400).send("Invalid company ID");

  const employee = await Employee.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      company: {
        _id: company._id,
        name: company.name
      },
      phone: req.body.phone,
      address: req.body.address,
      salary: req.body.salary,
      notes: req.body.notes
    },
    { new: true }
  ).select("-__v");

  if (!employee)
    return res.status(404).send("employee is not found with given ID");

  res.send(employee);
});

// create an employee
router.post("/", auth, async (req, res) => {
  const { error } = validateEmployee(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const company = await Company.findById(req.body.companyId);
  if (!company) return res.status(400).send("Invalid company");

  const employee = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    company: {
      _id: company._id,
      name: company.name
    },
    phone: req.body.phone,
    address: req.body.address,
    salary: req.body.salary,
    notes: req.body.notes
  });

  await employee.save();

  res.send(employee);
});

// delete an employee by id
router.delete("/:id", [auth, admin], async (req, res) => {
  const employee = await Employee.findByIdAndRemove(req.params.id);
  if (!employee)
    return res.status(404).send("employee is not found with given ID");

  res.send(employee);
});

module.exports = router;
