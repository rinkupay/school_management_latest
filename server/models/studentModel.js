const mongoose = require("mongoose");



const studentSchema = new mongoose.Schema({
    studentId:{
        type:String,
        unique:true
    },
    profileImage:{
        type:String
    },
    isActive:{
        type:Boolean,
        default:false,
    },
    currentlyAdmitted:{
      admissionDate:{
        type:Date,
        default: Date.now,
      }
    },
    progressionInfo:{
        isActive:{
            type:Boolean,
        },
        currentSession:{
            type:String,
        },
        progressionStatus:{
            type:String,
        },
        marks:{
            type:Number,
        },
        daysAttended:{
            type:Number,
        },
        schoolingStatus:{
            type:String,
        },
        std:{
            type:String,
        },
        prevStd:{
            type:String,
        },
        section:{
            type:String,
        },
        status:{
            type:Boolean,
        },
        progressedOn: {
            type: Date,
            default: Date.now, // Auto-set progression date
          },

        progressedBy: [
            {
              adminName: {
                type: String,
              },
              adminId: {
                type: mongoose.Schema.Types.ObjectId, 
            ref: "Admin",
              },
              updateTime: {
                type: Date,  // Use Date type to store the time of the update
                default: Date.now  // Automatically set to the current date/time
              }
            }
          ]
    },
  personalInfo:{
    fullName:{
        type: String,
        // required: [true, "Enter Student  name"]
    },
   
    dob:{
        type:Date,
        // required:[true, "Enter date of birth"]
    },
    gender:{
        type:String
    },
    motherName:{
        type:String,
        // required: [true, "Enter mother name"],
    },
    fatherName:{
        type:String,
        // required: [true, "Enter father name"],
    },
    gardianName:{
        type:String,
        // required: [true, "Enter father name"],
    },
    religion:{
        type:String
    },
    caste:{
        type:String
    },
    bloodGroup:{
        type:String
    },

 
    email:{
        type:String
    },
    mobile:{
        type:Number
    }
  },




// Academic Information
  academicInfo:{
    academicYear:{
        type:String,
    },
    rollNo:{
        type:Number
    },
    std:{
        type:String,
    },
    section:{
        type:String
    },

    admissionFee:{
        type:Number,
    },
 
    tutionFee:{
        type:Number,
    },
    busFee:{
        type:Number,
    },
    hostelFee:{
        type:Number
    },
    monthlyFee:{
        type:Number
    },
},



// Permanent Address
    permanentAddress:{
       address:{
        type:String,
       },
       city:{
        type:String,
       },
       state:{
        type:String,
       },
       pinCode:{
        type:Number,
       },
       phone:{
        type:Number
       },
    },

    // Corresponding Address
   correspondenceAddress:{
    address:{
        type:String,
       },
       city:{
        type:String,
       },
       state:{
        type:String,
       },
       pinCode:{
        type:Number,
       },
       phone:{
        type:Number
       },
        
    },
    //NOTIFICATION EMAIL AND SMS

    notificationInfo:{
        isEmail:{
            type:Boolean,
            default:false,
         
        },
        isSms:{
            type:Boolean,
            default:false,
            
        }
    },

  
    
    // Role of student
    role:{
        type:String,
        default:"student",
    },
    
   
      // Admin who created Student
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "Admin",
    // required:true,
  },
   // Information about updates made by admins
   updateBy: [
    {
      adminName: {
        type: String,
      },
      adminId: {
        type: mongoose.Schema.Types.ObjectId, 
            ref: "Admin",
      },
      updateTime: {
        type: Date,  // Use Date type to store the time of the update
        default: Date.now  // Automatically set to the current date/time
      }
    }
  ]

},{timestamps:true},
);

module.exports = mongoose.model("Student",studentSchema);