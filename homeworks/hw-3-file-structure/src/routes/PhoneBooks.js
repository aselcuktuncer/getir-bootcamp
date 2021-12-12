const express = require("express");
const { index, create, update, addContact} = require("../controllers/PhoneBooks");
const { createdPhoneBook } = require("../validations/PhoneBooks");
const validate = require("../middlewares/validate");

const router = express.Router();

router.route("/").get(index);
router.route("/").post(validate(createdPhoneBook, "body"), create);
router.route("/:id").patch(validate(createdPhoneBook, "body"), update)
router.route("/:id/add-contact").post(addContact)


module.exports = router;