const EmployeeList = require("../../models/EmployeeList");

async function deleteEmployeeController(req, res) {
  try {
    const { id } = req.params.id;

    if (!id) throw new Error("Employee ID is required.");

    // Find and delete the employee by ID
    const deletedEmployee = await EmployeeList.findByIdAndDelete(id);
    if (!deletedEmployee) throw new Error("Employee not found.");

    res.status(200).json({
      success: true,
      error: false,
      message: "Employee deleted successfully!",
      data: deletedEmployee
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: true,
      message: err.message || err
    });
  }
}

module.exports = deleteEmployeeController;
