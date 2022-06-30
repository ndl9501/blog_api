const httpStatus = require('http-status');
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const premisionService = require("../services/premision.service")

const findAll = catchAsync(async (req, res, next) => {
    const premisions = await premisionService.findAll();
    return res.status(httpStatus.OK).json({
        "status": httpStatus.OK,
        "msg": "success",
        premisions
    })
})

const findById = catchAsync(async (req, res, next) => {
    const premision = await premisionService.findById(req.params.id);
    return res.status(httpStatus.OK).json({
        "status": httpStatus.OK,
        "msg": "success",
        premision
    })
})

const create = catchAsync(async (req, res, next) => {

})


const update = catchAsync(async (req, res, next) => {

})

const remove = catchAsync(async (req, res, next) => {

})


module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}