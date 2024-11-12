const EmployeeList = require("../../models/EmployeeList");

async function createEmployeeController(req, res) {
  try {
    const { name, email, mobile, gender, course, designation, profilePic } = req.body;

    // Check if the employee already exists
    const employee = await EmployeeList.findOne({ email });
    if (employee) {
      throw new Error("Employee already exists with this email.");
    }

    // Validate required fields
    if (!email) throw new Error("Please provide an email.");
    if (!mobile) throw new Error("Please provide a mobile number.");
    if (!name) throw new Error("Please provide a name.");

    // Create a new employee document
    const newEmployee = new EmployeeList({
      name,
      email,
      mobile,
      gender: gender || "other",
      course,
      designation,
      profilePic
    });

    // Save the new employee
    const savedEmployee = await newEmployee.save();

    res.status(201).json({
      success: true,
      error: false,
      message: "Employee created successfully!",
      data: savedEmployee
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: true,
      message: err.message || err
    });
  }
}

module.exports = createEmployeeController;
