const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const Notification = require('./../model/notificationModel');
const globalController = require('./globalController');

//Read notification
exports.read = catchAsync(async(req,res,next)=>{
    const notification = await new Notification(req.body).readNotification(req.params.id)
    res.status(200).json({
        status:'success',
        data:{
            notification
        }
    })
})

//create one
exports.createOne = globalController.createRow(Notification)

//update
exports.state = globalController.offOn(Notification)

//Get all
exports.getAll = globalController.getAllRows(Notification);