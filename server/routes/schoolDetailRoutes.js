const express = require("express");
const router = express.Router();

const {isAuthenticatedUser,authorizeRole} = require("../middleware/authUser")

const {createSchoolDetails,saveSchoolSessions,getSchoolDetails} = require("../controllers/schoolDetailsController")



router.route("/create-school-details").post(isAuthenticatedUser,authorizeRole("super"),createSchoolDetails);
router.route("/create-school-session").post(isAuthenticatedUser,authorizeRole("super"),saveSchoolSessions);
router.route("/get-school-details").get(isAuthenticatedUser,authorizeRole("super"),getSchoolDetails);



module.exports = router;    