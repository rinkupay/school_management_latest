import { configureStore } from "@reduxjs/toolkit";
import studentSlice from "./features/studentSlice";
import studentEnquirySlice from "./features/studentEnquirySlice";
import singleStudentEnquirySlice from "./features/singleStudentEnquirySlice";
import studentDetailSlice from "./features/studentDetailSlice";
import registerStudentSlice from "./features/registerStudentSlice";
import userSlice from "./features/userSlice";
import transactionSlice from "./features/transactionSlice";

import studentTransactionSlice from "./features/studentTransactionSlice";

import receiptSlice from "./features/receiptSlice";
import userRegisterSlice from "./features/userRegisterSlice";
import userPasswordSlice from "./features/userPasswordSlice";
import resetPasswordSlice from "./features/resetPasswordSlice";
import activeStudentSlice from "./features/activeStudentSlice";
import statisticSlice from "./features/statisticSlice";
import allTeacherSlice from "./features/allTeacherSlice";
import teacherDetailSlice from "./features/teacherDetailSlice";
import teacherRegistrationSlice from "./features/teacherRegistrationSlice";
import teacherDuePaymentSlice from "./features/teacherDuePaymentSlice";
import teacherTransactionSlice from "./features/teacherTransactionSlice";
import teacherPaymentSlice from "./features/teacherPaymentSlice";
import teacherAllTransactionSlice from "./features/teacherAllTransactionsSlice";
import teacherSinglePaymentSlice from "./features/teacherSinglePaymentSlice";
import feeSettingsSlice from "./features/feeSettingSlice";
import studentDocumentSlice from "./features/studentDocumentSlice";
import singleStudentTransactionRollBackSlice from "./features/studentTransactionRollBack"
import studentProgressionSlice from "./features/studentProgressionSlice";
import studentDueReportSlice from "./features/studentDueReportSlice";
import smsEmailSettingSlice from "./features/smsEmailSettingsSlice";
import singleStudentDueTransactionSlice from "./features/singleStudentDueTransactionSlice"
import schoolNameSlice from "./features/schoolDetailsSlice/schoolDetailSlice";
import subscriptionSlice from "./features/subscriptionSlice/subscriptionSlice"
import fetchTeacherTotalAmountSlice from "./features/teacherStatistic";







const store = configureStore({
    reducer: {
        students:studentSlice,
        studentDetails:studentDetailSlice,
        registerStudent:registerStudentSlice,
        user: userSlice,
        registerUser:userRegisterSlice,
        transaction: transactionSlice,
    
        studentTransaction:studentTransactionSlice,
    
        paymentReceipt:receiptSlice,
        userPassword:userPasswordSlice,
        resetPassword:resetPasswordSlice,
        activeStudents:activeStudentSlice,
        statistic : statisticSlice,
        teacherStatistic:fetchTeacherTotalAmountSlice,
        teachers:allTeacherSlice,
        teacherDetails:teacherDetailSlice,
        teacher:teacherRegistrationSlice,
        teacherDuePayments:teacherDuePaymentSlice,
        teacherTransaction:teacherTransactionSlice,
        teacherPayment:teacherPaymentSlice,
        teacherAllPayments:teacherAllTransactionSlice,
        teacherSinglePayment:teacherSinglePaymentSlice,
        feeStructure:feeSettingsSlice,
        studentEnquiry:studentEnquirySlice,
        singleStudentEnquiryDetails:singleStudentEnquirySlice,
        studentDocument:studentDocumentSlice,
        singleStudentTransaction:singleStudentTransactionRollBackSlice,
        studentProgression:studentProgressionSlice,
        dueStudents:studentDueReportSlice,
        emailSmsSetting:smsEmailSettingSlice,
        dueFees:singleStudentDueTransactionSlice,
        schoolDetails:schoolNameSlice,

        subscription:subscriptionSlice,
     
    }
})

export default store;