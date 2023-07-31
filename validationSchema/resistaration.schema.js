const Joi = require('joi');

const restarationSChema=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required().min(4).max(10),
    name:Joi.string().optional().allow(''),
    confirm_password:Joi.string().required().min(4).max(10)
})

module.exports=restarationSChema;