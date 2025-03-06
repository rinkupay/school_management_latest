const mongoose = require('mongoose');


const studentDocumentsSchema = new mongoose.Schema({
    studentId:{
        type:mongoose.Schema.ObjectId,
        ref:"Student",
    },
    aadhar:{
        type:String
    },
    tc:{
        type:String
    },
    cc:{
        type:String
    },
    rc:{
        type:String
    }
})

module.exports = mongoose.model('studentDocuments',studentDocumentsSchema);