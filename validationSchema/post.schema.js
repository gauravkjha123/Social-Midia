const Joi = require('joi');

const postSChema=Joi.object({
    content:Joi.string().required(),
})

module.exports=postSChema;