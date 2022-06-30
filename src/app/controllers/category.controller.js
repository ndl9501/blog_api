const httpStatus = require('http-status');
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const categoryService = require("../services/category.service");

const findAll = catchAsync(async (req, res, next) => {
    const categories = await categoryService.findAll();
    return res.status(httpStatus.OK).json({
        "status": httpStatus.OK,
        "msg" : "success",
        categories
    });
})
const findById = catchAsync(async (req, res, next) => {
    const category = await categoryService.findById(req.params.id);
    return res.status(httpStatus.OK).json({
        "status": httpStatus.OK,
        "msg" : "success",
        category
    })
})
const create = catchAsync(async (req, res, next) => {
    // console.log(req.body);
    const category = await categoryService.createCategory(req.body);
    return res.status(httpStatus.CREATED).json({
        "status" : httpStatus.CREATED,
        "msg" : "success",
        "insertId" : category.id
    });
})
const update = catchAsync(async (req, res, next) => {

    const id = req.params.id;
    // console.log(id);
    // console.log("c :" , req.body);
    const update = await categoryService.update(req.body, id);
    return res.status(httpStatus.OK).json({
        "status" : httpStatus.OK,
        "msg" : "success",
        "update" : update
    })
})
const remove = catchAsync(async (req, res, next) => {
    console.log(req);
    const remove = await categoryService.remove(req.params.id);
    return res.status(httpStatus.CREATED).json({
        "status" : httpStatus.CREATED,
        "msg" : "success",
        "remove" : remove
    });
})

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
}