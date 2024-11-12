const mongoose = require('mongoose');

const employeeListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    course: {
        type: [String], // Change to array of strings
        required: true
    },
    profilePic : String,
}, {
    timestamps: true
});

const EmployeeList = mongoose.model("EmployeeList", employeeListSchema);

module.exports = EmployeeList;
