require("dotenv").config()
module.exports = {
    app: {
        PORT : process.env.PORT || 3000,
        static_folder: __dirname +"../src/public",
        tmp: __dirname+"/../temp",
        JWT_ACCESS_TOKEN_SECRET : process.env.JWT_ACCESS_TOKEN_SECRET || "JWT_ACCESS_TOKEN_SECRET@blog",
        JWT_ACCESS_TOKEN_LIFE : process.env.JWT_ACCESS_TOKEN_LIFE || "10m",
    },
    db: {
        HOST: process.env.DB_HOST || "localhost",
        USER: process.env.DB_USER || "root",
        PASSWORD: process.env.DB_PASSWORD || "root",
        DB_NAME: process.env.DB_NAME || "blog_api",
        PORT: process.env.DB_PORT || "3306",
        
    }
}