const httpStatus = require('http-status');
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const customerService = require("../services/customer.service")

const findAll = catchAsync(async (req, res, next) => {
    const customers = await customerService.findAll();
    return res.status(httpStatus.OK).json({
        "status": httpStatus.OK,
        "msg": "success",
        customers
    })
})

const findById = catchAsync(async (req, res, next) => {
    const customer = await customerService.findById(req.params.id);
    return res.status(httpStatus.OK).json({
        "status": httpStatus.OK,
        "msg": "success",
        customer
    })
})

const create = catchAsync(async (req, res, next) => {
    const customer = await customerService.create(req.body);
    return res.status(httpStatus.CREATED).json({
        "status" : httpStatus.CREATED,
        "msg" : "success",
        "insertId" : customer.id
    })
})


const update = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const update = await customerService.update(req.body, id);
    return res.status(httpStatus.OK).json({
        "status" : httpStatus.OK,
        "msg" : "success",
        "update" : update
    })
})

const remove = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const remove = await customerService.remove(req.params.id);
    return res.status(httpStatus.OK).json({
        "status" : httpStatus.OK,
        "msg" : "success",
        "remove" : remove
    });
})


module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}