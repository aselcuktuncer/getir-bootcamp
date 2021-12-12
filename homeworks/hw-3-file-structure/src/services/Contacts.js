const Contact = require("../models/Contact");

const list = () => {
  return Contact.find({});
};

const insert = (data) => {
  const contact = new Contact(data);
  return contact.save();
};

module.exports = {
  list,
  insert,
};
