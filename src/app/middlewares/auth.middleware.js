const httpStatus = require("http-status");
const jwtService = require("../services/jwt.service");
const authService = require("../services/auth.service");


const isAuth = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization || "";
        const token = authorization.split(" ")[1];
        if (token) {
            const decoded = await jwtService.verifyToken(token);
            // console.log(decoded.data?.id);

            next();
        }else{
            throw new Error("UNAUTHORIZED");
        }
    } catch (error) {
        return res.status(httpStatus.UNAUTHORIZED).json({
            "status": httpStatus.UNAUTHORIZED,
            "msg": error.message,
        })
    }

}
const isAdmin = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization || "";
        const token = authorization.split(" ")[1];
        if (token) {
            const decoded = await jwtService.verifyToken(token);
            console.log(decoded);
            const id = decoded.data?.id;
            if(!id){
                throw new Error("UNAUTHORIZED");
            }
            const role = await authService.role(id);
            console.log(role);
            if(role.premision_slug == "admin"){
                next();
            }else{
                throw new Error("UNAUTHORIZED");
            }
        }else{
            throw new Error("UNAUTHORIZED");
        }
    } catch (error) {
        return res.status(httpStatus.UNAUTHORIZED).json({
            "status": httpStatus.UNAUTHORIZED,
            "msg": error.message,
        })
    }
}

module.exports = {
    isAuth,
    isAdmin
}