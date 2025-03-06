const Student = require("../models/studentModel");

exports.generateStudentId = async () => {
    try {
        // Fetch the last added teacher sorted by `_id` in descending order
        const lastStudent = await Student.findOne().sort({ studentId: -1 });

      

        // Extract the numeric part of the last teacher's ID (remove "WEST" and parse the number)
        const lastId = lastStudent && lastStudent.studentId
            ? parseInt(lastStudent.studentId.replace("WES", ""), 10)
            : 0;

        // Increment the numeric part
        const newId = lastId + 1;

        // Return the new teacher ID with "WEST" prefix and zero-padded numeric part
        return `WES${String(newId).padStart(3, "0")}`;
    } catch (error) {
        console.error("Error generating teacher ID:", error.message);
        throw new Error("Unable to generate teacher ID.");
    }
};
