const jwt = require("jsonwebtoken");
const config = require("config");

const TOKEN_LIFE = config.get("app").JWT_ACCESS_TOKEN_LIFE;


const generateToken = (data) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            {
                data: data
            },
            secret,
            {
                algorithm: "HS256",
                expiresIn: TOKEN_LIFE,
            },
            (error, token) => {
                if (error) {
                    return reject(error);
                }
                resolve(token);
            });
    });
}
const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET_KEY, (error, decoded) => {
            if (error) {
                return reject(error);
            }
            resolve(decoded);
        });
    });
}

module.exports = {
    generateToken,
    verifyToken
}