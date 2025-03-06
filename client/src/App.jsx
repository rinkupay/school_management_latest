import React, { useEffect, lazy, Suspense, useState } from "react";
import "./App.css";
import "./components/dashboard/Dashboard.css";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadAdmin } from "./features/userSlice";
import { getSubscription } from "./features/subscriptionSlice/subscriptionSlice";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import MasterRoute from "./components/routes/MasterRoute";
import AdminRoute from "./components/routes/AdminRoute";
import Loader from "./components/loader/Loader";
import SpeedDialPopUp from "./components/dashboard/speedDialPopUp/SpeedDialPopUp";
import SideBar from "./components/sidebar/SideBar";
import { LuMenu } from "react-icons/lu";
import { useLocation } from "react-router-dom";
import SubscriptionPopUp from "./components/subscriptionPopUp/SubscriptionPopUp";

// Lazy load components

const Login = lazy(() => import("./components/login/Login"));
const Register = lazy(() => import("./components/register/Register"));
const RegisterStudent = lazy(() =>
  import("./components/dashboard/registerStudent/RegisterStudent")
);
const InactiveStudentDetails = lazy(() =>
  import("./components/dashboard/inactiveStudentDetails/InactiveStudentDetails")
);
const InactiveStudentUpdate = lazy(() =>
  import("./components/dashboard/inactiveStudentDetails/InactiveStudentUpdate")
);
const InactiveStudentPayment = lazy(() =>
  import("./components/dashboard/inactiveStudentDetails/InactiveStudentPayment")
);

const Students = lazy(() => import("./components/dashboard/Students"));
const ActiveStudents = lazy(() =>
  import("./components/dashboard/ActiveStudents")
);

const StudentProgression = lazy(() =>
  import("./components/dashboard/studentProgression/StudentProgression")
);

const SearchByName = lazy(() =>
  import("./components/dashboard/studentSearch/SearchByName")
);

const StudentEnquiry = lazy(() =>
  import("./components/dashboard/studentEnquiry/StudentEnquiry")
);
const StudentUpdate = lazy(() =>
  import("./components/dashboard/studentUpdate/StudentUpdate")
);

const StudentDetails = lazy(() =>
  import("./components/dashboard/StudentDetails")
);
const StudentStatus = lazy(() =>
  import("./components/dashboard/studentStatus/StudentStatus")
);

const StudentDocuments = lazy(() =>
  import("./components/dashboard/studentDocuments/StudentDocuments")
);
const Payment = lazy(() => import("./components/dashboard/payment/Payment"));
const StudentPymentRollBack = lazy(() =>
  import("./components/dashboard/studentPaymentRollBack/StudentPymentRollBack")
);

const StudentDueReport = lazy(() =>
  import("./components/dashboard/dueStudentReport/StudentDueReport")
);
const StudentReport = lazy(() =>
  import("./components/dashboard/studentActiveDeActiveReport/StudentReports")
);

const SectionShift = lazy(() =>
  import("./components/dashboard/sectionShift/SectionShift")
);
const Transaction = lazy(() => import("./components/dashboard/Transaction"));
const PaymentBill = lazy(() =>
  import("./components/dashboard/payment/PaymentBill")
);
const TransactionHistory = lazy(() =>
  import("./components/dashboard/paymentHistory/PaymentHistory")
);

const TransactionSlip = lazy(() =>
  import("./components/dashboard/paymentReceip/TransactionSlip")
);
const AdminProfile = lazy(() =>
  import("./components/dashboard/adminProfile/AdminProfile")
);
const PasswordChange = lazy(() =>
  import("./components/dashboard/passordChange/PasswordChange")
);
const ResetPassword = lazy(() =>
  import("./components/resetPassword/ResetPassword")
);
const ChangePassword = lazy(() =>
  import("./components/resetPassword/ChangePassword")
);

// TEACHERS ROUTES
const Teachers = lazy(() =>
  import("./components/dashboard/teachersComponents/Teachers")
);
const TeacherRegistration = lazy(() =>
  import(
    "./components/dashboard/teachersComponents/teacherRegister/TeacherRegisteration"
  )
);
const TeacherDetails = lazy(() =>
  import("./components/dashboard/teachersComponents/TeacherDetails")
);
const TeacherPayment = lazy(() =>
  import(
    "./components/dashboard/teachersComponents/teacherPayment/TeacherPayment"
  )
);
const TeacherPaymentHistory = lazy(() =>
  import(
    "./components/dashboard/teachersComponents/teacherPaymentHistory/TeacherPaymentHistory"
  )
);
const TeacherUpdate = lazy(() =>
  import(
    "./components/dashboard/teachersComponents/teacherUpdate/TeacherUpdate"
  )
);

const TeachersTransactions = lazy(() =>
  import(
    "./components/dashboard/teachersComponents/teacherTransactions/TeachersTransactions"
  )
);
const TeacherPaymentSlip = lazy(() =>
  import(
    "./components/dashboard/teachersComponents/paymentSlip/TeacherPaymentSlip"
  )
);
const EmployeeActivation = lazy(() =>
  import(
    "./components/dashboard/teachersComponents/employeeActivation/EmployeeActivation"
  )
);

// STATISTICS ROUTES
const StatisticComponent = lazy(() =>
  import("./components/dashboard/statistics/StatisticComponent")
);

// FEE SETTINGS

const FeeSettings = lazy(() =>
  import("./components/dashboard/feeSettings/FeeSettings")
);

// Admin Routes
const AllAdmins = lazy(() =>
  import("./components/dashboard/adminUsers/AdminUsers")
);

// <<<<<<<<<<<<<<<<============== SCHOOL DETAILS ==================>>>>>>>>>>>>>>>>>>
const SchoolDetails = lazy(() =>
  import("./components/schoolDetails/SchoolDetails")
);

const EmailSmsSettings = lazy(() =>
  import("./components/email_sms_settings/EmailSmsSettings")
);

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { subscription } = useSelector((state) => state.subscription);
  const [isPopUp, setIsPopUp] = useState(false);

  const currentDate = new Date().toISOString();

  const isMobileMenuActive =
    location.pathname === "/" || location.pathname === "/register";

  const { isLoggedIn } = useSelector((state) => state.user);
  const [isMenu, setIsMenu] = useState(false);

  // HANDLE MOBILE MENU
  const handleMobileMenu = () => {
    setIsMenu(!isMenu);
  };
  useEffect(() => {
    dispatch(loadAdmin());
  }, [dispatch]); // Add dispatch to dependencies

  useEffect(() => {
    // dispatch(getSubscription());
  }, [dispatch]);

  useEffect(() => {
    if (subscription) {
      if (subscription.expiryDate < currentDate) {
        setIsPopUp(true);
      }
    }
  }, [dispatch, subscription]);

  return (
    <div className={`dashboard-wrapper ${!isLoggedIn ? "full-width" : ""}`}>
      {/* SUBSCRIPTION POPUP */}
      {isPopUp && <SubscriptionPopUp />}

      <div className="dashboard-left">
        <div className="sidebar">{isLoggedIn && <SideBar />}</div>
      </div>
      {!isMobileMenuActive && (
        <>
          <div className="mobile-navbar">
            <LuMenu size={36} onClick={handleMobileMenu} />
          </div>
        </>
      )}
      {isMenu ? (
        <div className="mobile-navbar-menu">
          {isLoggedIn && <SideBar setIsMenu={setIsMenu} />}
        </div>
      ) : (
        ""
      )}
      <div className="speed-dial">{isLoggedIn && <SpeedDialPopUp />}</div>
      <div className="dashboard-right">
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* Login Register Routes */}
            <Route path="/" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <StatisticComponent />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/student-enquiry"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <StudentEnquiry />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/register-student"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <RegisterStudent />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/students"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <Students />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/search-student"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <SearchByName />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/students-active"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <ActiveStudents />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            {/* STUDENT STATUS */}

            <Route
              path="/student-status/:id"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <StudentStatus />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/student-progression"
              element={
                <ProtectedRoute>
                  {" "}
                  <AdminRoute>
                    {" "}
                    <StudentProgression />{" "}
                  </AdminRoute>{" "}
                </ProtectedRoute>
              }
            />

            {/* SECTION SHIFT */}

            <Route
              path="/section-shift"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <SectionShift />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            {/* ROUTE FOR INACTIVE STUDENT */}
            <Route
              path="/student-inactive/:id"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <InactiveStudentDetails />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            {/*  ROUTE FOR ADMISSION FEE PAYMENT   */}
            <Route
              path="/payment-admission/:id"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <InactiveStudentPayment />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/inactive-student-update/:id"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <InactiveStudentUpdate />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/student/:id"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <StudentDetails />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/student-documents/:id"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <StudentDocuments />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/student-update/:id"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <StudentUpdate />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/transaction"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <Transaction />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            {/* STUDENT DUE REPORT */}
            <Route
              path="/due-reports"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <StudentDueReport />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/student-reports"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <StudentReport />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            {/* STUDENT PAYMENT ROLL BACK */}

            <Route
              path="/transaction-rollback"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <StudentPymentRollBack />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/payment/:id"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <Payment />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/history/:id"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <TransactionHistory />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/transaction/:id"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <TransactionSlip />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <PaymentBill />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:id"
              element={
                <ProtectedRoute>
                  <AdminProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/password-change/:id"
              element={
                <ProtectedRoute>
                  <PasswordChange />
                </ProtectedRoute>
              }
            />

            <Route path="/password-reset" element={<ResetPassword />} />
            <Route path="/password/reset/:token" element={<ChangePassword />} />

            {/* <<<<<<<<<<<<<<<>>>>>>>>>>> TEACHERS ROUTES ===============>>>>>>>>>>>>>>>>*/}
            <Route
              path="/teachers"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <Teachers />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/add-teacher"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <TeacherRegistration />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/teacher/:id"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <TeacherDetails />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/teacher-payment/:id"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <TeacherPayment />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/teacher-pay-history/:id"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <TeacherPaymentHistory />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/teacher-update/:id"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <TeacherUpdate />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/teacher-transactions"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <TeachersTransactions />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/teacher-transaction/:id"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <TeacherPaymentSlip />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            {/* EMPLOYEE ACTIVATION */}
            <Route
              path="/emp-activation"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <EmployeeActivation />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            {/*  STATISTICS ROUTES  */}
            <Route
              path="/statistics"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <StatisticComponent />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            {/* <<<<<<<<<<<<<<<>>>>>>>>>>> FEE SETTINGS ROUTES ===============>>>>>>>>>>>>>>>>*/}
            <Route
              path="/fee-settings"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <FeeSettings />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            {/* <<<<<<<<<<<========= ADMIN ROUTES ==============>>>>>>>>>>> */}
            <Route
              path="/all-admins"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <MasterRoute>
                      <AllAdmins />
                    </MasterRoute>
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            {/* <<<<<<<<========== SMS AND EMAIL SETTINGS */}

            <Route
              path="/email-sms-settings"
              element={
                <MasterRoute>
                  <EmailSmsSettings />
                </MasterRoute>
              }
            />

            {/* <<<<<<<<========== SCHOOL DETAILS SETTINGS */}

            <Route
              path="/school-details"
              element={
                <MasterRoute>
                  <SchoolDetails />
                </MasterRoute>
              }
            />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
