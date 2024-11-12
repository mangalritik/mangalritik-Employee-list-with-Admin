const EmployeeList = require("../../models/EmployeeList");

async function updateEmployeeController(req, res) {
  try {
    const { _id, name, email, mobile, gender, course, designation, profilePic } = req.body;

    if (!_id) throw new Error("Employee ID is required.");

    // Check if employee exists
    const employee = await EmployeeList.findById(_id);
    if (!employee) throw new Error("Employee not found.");

    // Update the employee data
    const updatedData = {
      name,
      email,
      mobile,
      gender,
      course,
      designation,
      profilePic
    };

    const updatedEmployee = await EmployeeList.findByIdAndUpdate(_id, updatedData, { new: true });

    res.status(200).json({
      success: true,
      error: false,
      message: "Employee updated successfully!",
      data: updatedEmployee
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: true,
      message: err.message || err
    });
  }
}

module.exports = updateEmployeeController;
