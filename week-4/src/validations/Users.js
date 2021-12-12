const Joi = require("joi");
const createUser = Joi.object({
  // body: {
  first_name: Joi.string().required().min(2),
  last_name: Joi.string().required().min(2),
  email: Joi.string().email().required().min(8),
  password: Joi.string().required().min(8),
  // },
  // query: {
  //   typeId: Joi.string(),
  // },
});

const userQuery = Joi.object({
  id: Joi.string().required().min(2),
  location: Joi.string().required().min(2),
});

module.exports = {
  createUser,
  userQuery,
};
