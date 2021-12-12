const User = require("../models/User");

const list = () => {
  return User.find({});
};

const insert = (data) => {
  const user = new User(data);
  return user.save();
};

module.exports = {
  list,
  insert,
};
