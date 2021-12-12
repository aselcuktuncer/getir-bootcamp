const express = require("express");
const { index, create} = require("../controllers/Contacts");
const { createContact } = require("../validations/Contact");
const validate = require("../middlewares/validate");

const router = express.Router();

router.route("/").get(index);
router.route("/").post(validate(createContact, "body"), create);

module.exports = router;