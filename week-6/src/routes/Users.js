const express = require("express");
// const { index, create, login, resetPassword } = require("../controllers/Users");
const Users = require("../controllers/Users");
const userSchemas = require("../validations/Users");
const validate = require("../middlewares/validate");
// const authenticate = require("../middlewares/authenticate");
const authenticateAdmin = require("../middlewares/authenticateAdmin");

const router = express.Router();

router.route("/create-admin-user").post(validate(userSchemas.createAdminUser, "body"), Users.create);
router.route("/login").post(validate(userSchemas.userLogin, "body"), Users.login);

//! Admin Stuff.
router.route("/").get(authenticateAdmin, Users.index);
router.route("/").post(authenticateAdmin, validate(userSchemas.createUser, "body"), Users.create);
router.route("/reset-password").post(validate(userSchemas.resetPassword), Users.resetPassword);
// router.route("/:typeId").post(validate(userQuery, "query"),validate(createUser, "body"), create);

module.exports = router;
