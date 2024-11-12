const express = require("express")
const router = express.Router()
const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require('../controller/user/userSignIn')
const userDetailsController = require("../controller/user/userDetails")
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require("../controller/user/allUsers")
const createEmployeeController = require("../controller/user/CreateEmployee")
const updateEmployeeController = require("../controller/user/UpdateEmployee")
const deleteEmployeeController = require("../controller/user/DeleteEmployee")

router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)

router.get("/all-user",authToken,allUsers)
router.post("/create", createEmployeeController);
router.put("/update", updateEmployeeController);
router.delete("/delete/:id", deleteEmployeeController);

module.exports = router