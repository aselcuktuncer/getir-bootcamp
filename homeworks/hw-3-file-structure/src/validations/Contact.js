const Joi = require("joi")

const createContact = Joi.object({
    first_name: Joi.string().required().min(2),
    last_name: Joi.string().required().min(2),
    phone_number: Joi.string().required().min(10),
});

module.exports = {
    createContact,
}