const CategoryModel = require("../models/category.model");
const ApiError = require("../utils/apiError");
const slug = require("slug");

const createCategory = async (body) => {
    // console.log(body);
    const newCategory = new CategoryModel({
        category_title: body.title,
        category_description: body.description
    })
    // console.log(newCategory);
    return await CategoryModel.create(newCategory);

}

const findAll = async () => {
    return await CategoryModel.findAll();
}

const findById = async (id) => {
    return await CategoryModel.findById(id);
}

const update = async (body, id) => {
    const updateCategory = {};
    if (body?.name) {
        updateCategory.category_name = body.name;
        updateCategory.slug = slug(body.name, "_");
    }
    if (body?.description) {
        updateCategory.category_description = body.description;
    }

    updateCategory.published = body.published;

    if(updateCategory && Object.keys(updateCategory).length){
        console.log("body :", body);
        console.log("updateCategory :", updateCategory);
        return await CategoryModel.update(updateCategory, id);
    }
}

const remove = async (id) => {
    return await CategoryModel.delete(id);
}
module.exports = {
    createCategory,
    findAll,
    findById,
    remove,
    update
}