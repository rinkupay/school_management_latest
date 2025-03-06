const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Subscription = require("../models/subscriptionModel");



// SET SUBSCRIPTION DATE

exports.setSubscriptionYear = catchAsyncErrors(async (req, res) => {

    const {startDate , expiryDate} = req.body;

  try {

    // if(!startDate && !expiryDate){
    //     return res.status(500).json({
    //         success:false,
    //         message:"Invalid Date"
    //     })
    // }
    
    //  const subscription =await Subscription.findOneAndUpdate({
    //     startDate,
    //     expiryDate,
    //  })

    const subscription = new Subscription({startDate,expiryDate});


await subscription.save();
     res.status(201).json({
        success:true,
        message:"Thanks for subscription.."
     })


  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});





// GET SUBSCRIPTION DATE

exports.getSubscriptionYear = catchAsyncErrors(async (req, res) => {

    

  try {
    
     const subscription = await Subscription.findOne();


     res.status(201).json({
        success:true,
        subscription
     })


  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});