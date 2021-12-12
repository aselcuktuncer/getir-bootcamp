const PhoneBook = require("../models/PhoneBook");

const list = () => {
  return PhoneBook.find({})
    .populate({
        path: "owner",
        select: "first_name last_name phone_number",
    })
    .populate({
        path: "contacts",
        populate: {
          path: "contact_id",
          select: "first_name last_name phone_number",
        },
      });
};

const insert = (data) => {
  const phoneBook = new PhoneBook(data);
  return phoneBook.save();
};

const findOne = (where) => {
    return PhoneBook.findById(where);
};

const updateDoc = (docID, objectData) => {
    return PhoneBook.findByIdAndUpdate(docID,objectData, {new: true});
}

module.exports = {
  list,
  insert,
  findOne,
  updateDoc,
};
