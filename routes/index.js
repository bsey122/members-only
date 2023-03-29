var express = require("express");
var router = express.Router();

// Require controller module
const indexController = require("../controllers/indexController");

/* GET home page. */
router.get("/", indexController.index);

module.exports = router;
