const express = require("express");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizeRole,
} = require("../middleware/authUser");
const {
  registerStudent,
  getAllStudents,
  studentDetails,
  studentDetailsUpdate,
  deleteStudent,
  getActiveStudents,
  searchStudentByName,
  searchStudentBySchoolId,
  uploadStudentDocuments,
  getSingleStudentDocuments,
  setProgression,
  correctStudentProgression,
  setEmailSms,
  updateStudentSection,
} = require("../controllers/studentControllers");
const upload = require("../middleware/multer");

router
  .route("/new/student")
  .post(
    upload.single("image"),
    isAuthenticatedUser,
    authorizeRole("admin","super"),
    registerStudent
  ); // ADMIN ROUTE

router.route("/student-documents/:id").post(
  upload.fields([
    { name: "aadhar", maxCount: 1 },
    { name: "tc", maxCount: 1 },
    { name: "cc", maxCount: 1 },
    { name: "rc", maxCount: 1 },
  ]),
  isAuthenticatedUser,
  authorizeRole("admin","super"),
  uploadStudentDocuments
).get(isAuthenticatedUser,authorizeRole("admin","super"),getSingleStudentDocuments) // ADMIN ROUTE,


router.route("/student-section-update/:id").patch(isAuthenticatedUser,authorizeRole("admin","super"),updateStudentSection);  // UPDATE STUDENT SECTION

router
  .route("/students")
  .get(isAuthenticatedUser, authorizeRole("admin","super"), getAllStudents); // ADMIN ROUTE
router
  .route("/students-active")
  .get(isAuthenticatedUser, authorizeRole("admin","super"), getActiveStudents); // ADMIN ROUTE
router
  .route("/student/:id")
  .get(isAuthenticatedUser, authorizeRole("admin","super"), studentDetails)
  .delete(isAuthenticatedUser, authorizeRole("admin","super"), deleteStudent);
router
  .route("/student-update/:id")
  .put(
    upload.single("image"),
    isAuthenticatedUser,
    authorizeRole("admin","super"),
    studentDetailsUpdate
  ).patch(isAuthenticatedUser,authorizeRole("admin","super"),setEmailSms) // ADMIN ROUTE
router
  .route("/studentByName")
  .get(isAuthenticatedUser, authorizeRole("admin","super"), searchStudentByName); // ADMIN ROUTE
router
  .route("/studentBySchoolId")
  .get(isAuthenticatedUser, authorizeRole("admin","super"), searchStudentBySchoolId); // ADMIN ROUTE

  router.route("/progression/:id").patch(isAuthenticatedUser,authorizeRole("admin","super"),setProgression);  // ADMIN ROUTE
  router.route("/progression-update/:id").patch(isAuthenticatedUser,authorizeRole("admin","super"),correctStudentProgression);  // ADMIN ROUTE

module.exports = router;
