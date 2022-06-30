const httpStatus = require('http-status')
const catchAsync = require("../utils/catchAsync")
const ApiError = require('../utils/apiError');
const tagService = require("../services/tag.service");

const findAll = catchAsync(async (req, res, next) => {
    const tags = await tagService.findAll();
    return res.status(httpStatus.OK).json({
        "status": httpStatus.OK,
        "msg" : "success",
        tags
    });
})

const findById = catchAsync(async (req, res, next)=>{
    const tag = await tagService.findById(req.params.id);
    return res.status(httpStatus.OK).json({
        "status": httpStatus.OK,
        "msg" : "success",
        tag
    })
})

const create = catchAsync(async (req, res, next) => {
    // console.log(req.body);
    const tag = await tagService.createTag(req.body);
    return res.status(httpStatus.CREATED).json({
        "status" : httpStatus.CREATED,
        "msg" : "success",
        "insertId" : tag.id
    });
})

const update = catchAsync(async (req, res, next)=>{
    // update tag

    const id = req.params.id;
    // console.log(id);
    // console.log("c :" , req.body);
    const update = await tagService.update(req.body, id);
    return res.status(httpStatus.OK).json({
        "status" : httpStatus.OK,
        "msg" : "success",
        "update" : update
    })


})

const remove = catchAsync(async (req, res, next)=>{
    console.log(req);
    const remove = await tagService.remove(req.params.id);
    return res.status(httpStatus.CREATED).json({
        "status" : httpStatus.CREATED,
        "msg" : "success",
        "remove" : remove
    });
})
module.exports = {
    findAll,
    create,
    findById,
    update,
    remove
}