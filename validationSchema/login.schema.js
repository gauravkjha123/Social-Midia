const Joi = require('joi');

const loginSChema=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required().min(4).max(10),
})

module.exports=loginSChema;