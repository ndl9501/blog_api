const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const authService = require("../services/auth.service");
const jwtService = require("../services/jwt.service");

const login = catchAsync(async (req, res, next) => {
    const customer = await authService.login(req.body);
    if (customer) {
        const token = await jwtService.generateToken({ "id": customer.customer_id });
        return res.status(httpStatus.OK).json({
            "status": httpStatus.OK,
            "msg": "success",
            "data": customer,
            "token": token
        })
    }else{
        return res.status(httpStatus.OK).json({
            "status": httpStatus.OK,
            "msg": "login is fail",
            "data": {}
        })
    }
    
})

const register = catchAsync(async (req, res, next) => {
    const register = await authService.register(req.body);
    console.log(register);
    const token = await jwtService.generateToken({ "id": register.id });
    return res.status(httpStatus.CREATED).json({
        "status": httpStatus.CREATED,
        "msg": "success",
        "data": register,
        "token": token
    })
})
module.exports = {
    login,
    register
}