const CustomerModel = require("../models/customer.model");
const ApiError = require("../utils/ApiError");
const slug = require("slug");
const md5 = require('md5');

const create = async (body) => {
    console.log(body);
    const newCustomer = new CustomerModel({
        customer_name: body.name,
        customer_phonenumber: body.phonenumber,
        customer_email: body.email,
        password: body.password,
        customer_addr: body.addr,
        customer_avatar: body.avatar,
        customer_gender: body.gender,
        pre_id: body.pre_id,
    })
    return await CustomerModel.create(newCustomer);
}

const findAll = async()=>{
    return await CustomerModel.findAll();
}

const findById = async (id)=>{
    return await CustomerModel.findById(id);
}

const update = async (body, id) => {
    const updateCustomer = {};
    if(body?.name){
        updateCustomer.customer_name = body.name;
    }
    if(body?.phonenumber){
        updateCustomer.customer_phonenumber = body.phonenumber
    }
    if(body?.email){
        updateCustomer.customer_email = body.email
    }
    if(body?.password){
        updateCustomer.password = body.phonenumber;
        updateCustomer.password = await md5(updateCustomer.password);
    }
    if(body?.customer_addr){
        updateCustomer.customer_addr = body.addr
    }
    if(body?.gender){
        updateCustomer.customer_gender = body.gender;
    }
    if(body?.gender){
        updateCustomer.gender = body.gender;
    }
    if(body?.pre_id){
        updateCustomer.pre_id = body.pre_id;
    }
    console.log(updateCustomer);
    return await CustomerModel.update(updateCustomer, id);
}

const remove = async (id) => {
    return await CustomerModel.delete(id);
}

module.exports = {
    create,
    findAll,
    findById,
    remove,
    update
}