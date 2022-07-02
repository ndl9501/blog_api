const httpStatus = require('http-status');
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const blogService = require("../services/blog.service");
const jwtService = require("../services/jwt.service");
const blog_fileService = require("../services/blog_file.service");
const blog_tagService = require("../services/blog_tag.service");
const path = require('path');
const fs = require('fs');

const findAll = catchAsync(async (req, res, next) => {
    const blogs = await blogService.findAll();
    return res.status(httpStatus.OK).json({
        "status": httpStatus.OK,
        "msg": "success",
        "data": blogs
    });
})
const findById = catchAsync(async (req, res, next) => {
    const blog = await blogService.findById(req.params.id);
    return res.status(httpStatus.OK).json({
        "status": httpStatus.OK,
        "msg": "success",
        "data": blog
    })
})
const create = catchAsync(async (req, res, next) => {
    // if(req.body.tag)
    // console.log(req.body);
    // return res.json({
    //     "body" : req.body,
    //     "files" : req.files
    // })
    const authorization = req.headers.authorization || "";
    const token = authorization.split(" ")[1];
    if (token) {
        const decoded = await jwtService.verifyToken(token);
        // console.log(decoded.data?.id);
        const id = decoded.data.id;
        const blog = await blogService.create(req.body, id);
        if (req.files) {
            files = req.files
            console.log(files);
            for (let index = 0; index < files.length; index++) {
                const element = files[index];
                const thumbnail = "img/" + element.filename;
                console.log(files);
                fs.renameSync(element.path, path.resolve("src/public", thumbnail));
                // WARNNING
                blog_fileService.create(thumbnail, blog.id)

            }
        }
        if (req.body.tag) {

            for (const tag of req.body.tag) {
                // console.log(tag);
                blog_tagService.create(blog.id, tag);
            }
        }
        return res.status(httpStatus.CREATED).json({
            "status": httpStatus.CREATED,
            "msg": "success",
            "data": blog.id
        });
    }
    else {
        throw new ApiError(httpStatus.UNAUTHORIZED, "UNAUTHORIZED");
    }
})
const update = catchAsync(async (req, res, next) => {

    const id = req.params.id;

    const update = await blogService.update(req.body, id);
    return res.status(httpStatus.OK).json({
        "status": httpStatus.OK,
        "msg": "success",
        "update": update
    })
})
const remove = catchAsync(async (req, res, next) => {
    console.log(req);
    const remove = await blogService.remove(req.params.id);
    return res.status(httpStatus.OK).json({
        "status": httpStatus.OK,
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