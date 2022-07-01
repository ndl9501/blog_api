const jwt = require("jsonwebtoken");
const config = require("config");

const TOKEN_LIFE = config.get("app").JWT_ACCESS_TOKEN_LIFE;
const TOKEN_SECRET = config.get("app").JWT_ACCESS_TOKEN_SECRET;


const generateToken = (data) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            {
                data: data
            },
            TOKEN_SECRET,
            {
                algorithm: "HS256",
                expiresIn: TOKEN_LIFE,
            },
            (error, token) => {
                if (error) {
                    console.error(error);
                    return reject(error);
                }
                resolve(token);
            });
    });
}
const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, TOKEN_SECRET, (error, decoded) => {
            if (error) {
                console.error(error);
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