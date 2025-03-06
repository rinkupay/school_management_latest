const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({

    startDate:{
        type:Date,
        requird:true,
        default:Date.now(),
        
    },
    expiryDate:{
        type:Date,
        requird:true,
        default:function(){
            const oneWeekLater = new Date(this.startDate)
            oneWeekLater.setDate(oneWeekLater.getDate())
            return oneWeekLater;
        },
    },
})

module.exports = mongoose.model("Subscription",subscriptionSchema)