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
    const premision = await premisionService.create(req.body);
    return res.status(httpStatus.CREATED).json({
        "status" : httpStatus.CREATED,
        "msg" : "success",
        "insertId" : premision.id
    })
})


const update = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const update = await premisionService.update(req.body, id);
    return res.status(httpStatus.OK).json({
        "status" : httpStatus.OK,
        "msg" : "success",
        "update" : update
    })
})

const remove = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const remove = await premisionService.remove(req.params.id);
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