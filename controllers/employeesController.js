const Employee = require("../model/Employee");

const getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  if (!employees)
    return res.status(204).json({ message: "No employees found." });
  res.json(employees);
};

const createNewEmployee = async (req, res) => {
  if (!req?.body?.employeeName) {
    return res.status(400).json({ message: "employeeName is required" });
  }
  if (!req?.body?.age) {
    return res.status(400).json({ message: "Age is required" });
  }

  try {
    const result = await Employee.create({
      employeeName: req.body.employeeName,
      age: req.body.age,
      email: req.body.email,
      salaryAmount: req.body.salaryAmount,
      degreeDetails: req.body.degreeDetails,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updateEmployee = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  const employee = await Employee.findOne({ _id: req.params.id }).exec();
  if (!employee) {
    return res
      .status(404)
      .json({ message: `No employee matches ID ${req.params.id}.` });
  }
  if (req.body?.employeeName) employee.employeeName = req.body.employeeName;
  if (req.body?.age) employee.age = req.body.age;
  if (req.body?.email) employee.email = req.body.email;
  if (req.body?.salaryAmount) employee.salaryAmount = req.body.salaryAmount;
  if (req.body?.degreeDetails) employee.degreeDetails = req.body.degreeDetails;
  const result = await employee.save();
  res.json(result);
};

const deleteEmployee = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "Employee ID required." });
  }

  const employee = await Employee.findOne({ _id: req.params.id }).exec();
  if (!employee) {
    return res
      .status(404)
      .json({ message: `No employee matches ID ${req.params.id}.` });
  }
  const result = await employee.deleteOne(); //{ _id: req.body.id }
  res.status(204).json(result);
};

const getEmployee = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "Employee ID required." });
  }
  const employee = await Employee.findOne({ _id: req.params.id }).exec();
  if (!employee) {
    return res
      .status(404)
      .json({ message: `No employee matches ID ${req.params.id}.` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
