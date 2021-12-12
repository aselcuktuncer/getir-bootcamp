const express = require("express");
const router = express.Router();

router.route("/").get(() => {
  console.log("List Index");
});

module.exports = router;
