const AuthModel = require("../models/auth.model");
const ApiError = require("../utils/ApiError");

const login = async (body) => {
    const auth = new AuthModel(body);

    return await AuthModel.login(auth);
}

const register = async (body) => {
    const auth = new AuthModel(body);

    return await AuthModel.register(auth);
}

const role = async (id) => {
    return await AuthModel.ROLE(id);
}

module.exports = {
    login,
    register,
    role
}