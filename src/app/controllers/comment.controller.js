const httpStatus = require('http-status');
const catchAsync = require("../utils/catchAsync");
const jwtService = require("../services/jwt.service");
const ApiError = require("../utils/ApiError");
const commentService = require("../services/comment.service");

const findAll = catchAsync(async (req, res, next) => {
    const comments = await commentService.findAll();
    return res.status(httpStatus.OK).json({
        "status": httpStatus.OK,
        "msg": "success",
        comments
    });
})
const findById = catchAsync(async (req, res, next) => {
    const comment = await commentService.findById(req.params.id);
    return res.status(httpStatus.OK).json({
        "status": httpStatus.OK,
        "msg": "success",
        comment
    })
})
const create = catchAsync(async (req, res, next) => {
    // console.log(req.body);
    const authorization = req.headers.authorization || "";
    const token = authorization.split(" ")[1];
    if (token) {
        const decoded = await jwtService.verifyToken(token);
        // console.log(decoded.data?.id);
        const customer_id = decoded.data.id;
        const comment = await commentService.create(req.body, customer_id);
        return res.status(httpStatus.CREATED).json({
            "status": httpStatus.CREATED,
            "msg": "success",
            "insertId": comment.id
        });
    }

})
const update = catchAsync(async (req, res, next) => {

    const id = req.params.id;
    // console.log(id);
    console.log("c :" , req.body);
    const update = await commentService.update(req.body, id);
    return res.status(httpStatus.OK).json({
        "status": httpStatus.OK,
        "msg": "success",
        "update": update
    })
})
const remove = catchAsync(async (req, res, next) => {
    // console.log(req);
    const remove = await commentService.remove(req.params.id);
    return res.status(httpStatus.CREATED).json({
        "status": httpStatus.CREATED,
        "msg": "success",
        "remove": remove
    });
})


module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
}