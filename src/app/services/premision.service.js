const PremisionModel = require("../models/premision.model");
const ApiError = require("../utils/ApiError");
const slug = require("slug");

const create = async (body) => {
    console.log(body);
    const newPremision = new PremisionModel({
        premision_name: body.name,
        premision_description: body.description,
    })
    return await PremisionModel.create(newPremision);
}

const findAll = async()=>{
    return await PremisionModel.findAll();
}

const findById = async (id)=>{
    return await PremisionModel.findById(id);
}

const update = async (body, id) => {
    const updatePremision = {};
    if(body?.name){
        updatePremision.premision_name = body.name;
        updatePremision.premision_slug = slug(body.name, "_");
    }
    if(body?.description){
        updatePremision.premision_description = body.description;
    }
    console.log(updatePremision);
    return await PremisionModel.update(updatePremision, id);
}

const remove = async (id) => {
    return await PremisionModel.delete(id);
}

module.exports = {
    create,
    findAll,
    findById,
    remove,
    update
}