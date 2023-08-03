const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  employeeName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
  },
  salaryAmount: {
    type: Number,
  },
  degreeDetails: {
    type: Array,
  },
  createdOn: {
    required: true,
    type: Date,
    set: Date.now,
    default: Date.now,
  },
  updatedOn: {
    required: true,
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
