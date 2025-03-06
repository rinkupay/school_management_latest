const mongoose = require("mongoose");



const schoolDetailSchema = new mongoose.Schema({

    schoolName: {
        type: String,
        required: true,
        default:"ABC SCHOOL"
    },  
    schoolAddress: {
        type: String,
        required: true,
        default:"XYZ 2421"
    },
  
    sessionDetails: {
       startDate: {
           type: String,
           default:"2025-03-01"
          
       },
         endDate: {
              type: String,
              default:"2026-02-01"
             
         },

}

},{timestamps: true})
module.exports = mongoose.model("SchoolDetail", schoolDetailSchema);