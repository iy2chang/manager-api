const { Company, validateCompany } = require("../models/company");
const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

// get all companies
router.get("/", async (req, res) => {
  const companies = await Company.find()
    .sort("name")
    .select("-__v");
  res.send(companies);
});

// get company by id
router.get("/:id", validateObjectId, async (req, res) => {
  const company = await Company.findById(req.params.id);
  if (!company)
    return res.status(404).send("Could not find the company with given ID");

  res.send(company);
});

// create a company
router.post("/", auth, async (req, res) => {
  const { error } = validateCompany(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check to see if a company already exist in the db
  let company = await Company.findOne({ name: req.body.name });
  if (company) return res.status(400).send("Company already existed");

  company = new Company({
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
    info: req.body.info,
    notes: req.body.notes,
    isVip: req.body.isVip
  });

  await company.save();

  res.send(company);
});

// update a company
router.put("/:id", auth, async (req, res) => {
  const { error } = validateCompany(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const company = await Company.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      notes: req.body.notes,
      isVip: req.body.isVip
    },
    { new: true }
  );

  if (!company)
    return res.status(404).send("Could not find the company with given ID");

  res.send(company);
});

// delete a company
router.delete("/:id", [auth, validateObjectId], async (req, res) => {
  const company = await Company.findByIdAndRemove(req.params.id);
  if (!company)
    return res.status(404).send("Could not find the company with given ID");

  res.send(company);
});

module.exports = router;
