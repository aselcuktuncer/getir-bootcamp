const Joi = require("joi");

const createdPhoneBook = Joi.object({
    title: Joi.string().required().min(2),
    owner: Joi.string(),
    contacts: Joi.array()
})

module.exports = {
    createdPhoneBook,
}