const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  isAuthenticatedUser,
  authorizeRole,
} = require("../middleware/authUser");
const {
  registerTeacher,
  updateTeacher,
  deleteTeacher,
  teacherDetails,
  allTeachers,
  updateTeacherProfilePicture,
  updateTeacherStatus,
} = require("../controllers/teacherController");

// router
//   .route("/teacher-register")
//   .post(upload.single("image"),isAuthenticatedUser, authorizeRole("admin"), registerTeacher);

router.route("/teacher-register").post(
  upload.fields([
    { name: "profileImage", maxCount: 1 }, // handle profile image
    { name: "image", maxCount: 1 }, // handle resume
  ]),
  isAuthenticatedUser,
  authorizeRole("admin","super"),
  registerTeacher
);

router
  .route("/teacher/:id")
  .put(
    upload.fields([{ name: "image", maxCount: 1 }]),
    isAuthenticatedUser,
    authorizeRole("admin","super"),
    updateTeacher
  )
  .delete(isAuthenticatedUser, authorizeRole("admin","super"), deleteTeacher)
  .get(isAuthenticatedUser, authorizeRole("admin","super"), teacherDetails);
// UPDATE TEACHER

router.route("/teacher-pic-update/:id").post(upload.single("image"),isAuthenticatedUser,authorizeRole("admin","super"),updateTeacherProfilePicture);
router
  .route("/teachers")
  .get(isAuthenticatedUser, authorizeRole("admin","super"), allTeachers);


  router.route("/teacher-status-update/:id").patch(isAuthenticatedUser,authorizeRole("super"),updateTeacherStatus) // ONLY FOR SUPER ADMIN

module.exports = router;
