const express = require("express");
const Products = require("../controllers/Products");
const schemas = require("../validations/Products");
const validate = require("../middlewares/validate");
const idChecker = require("../middlewares/idChecker");

const authenticate = require("../middlewares/authenticate");
const authenticateAdmin = require("../middlewares/authenticateAdmin");

const router = express.Router();

router.route("/").get(Products.index);
router.route("/:id/add-comment").post(idChecker, authenticate, validate(schemas.addComment, "body"), Products.addComment);

router.route("/").post(authenticateAdmin, validate(schemas.createProduct, "body"), Products.create);
router.route("/:id").patch(idChecker, authenticateAdmin, validate(schemas.updateProduct, "body"), Products.update);
router.route("/:id/add-media").post(idChecker, authenticateAdmin, Products.addMedia);
// router.route("/:typeId").post(validate(userQuery, "query"),validate(createUser, "body"), create);

module.exports = router;
