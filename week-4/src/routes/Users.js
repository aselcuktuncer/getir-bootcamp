const express = require("express");
const { index, create } = require("../controllers/Users");
const { createUser } = require("../validations/Users");
const validate = require("../middlewares/validate");

const router = express.Router();

router.route("/").get(index);
router.route("/").post(validate(createUser, "body"), create);
// router.route("/:typeId").post(validate(userQuery, "query"),validate(createUser, "body"), create);

module.exports = router;
