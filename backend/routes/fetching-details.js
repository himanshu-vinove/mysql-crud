const express = require('express');
const router = express.Router();
const db = require("../db");
const fetchController = require("../controller/fetch-data-controller");


router.get("/mostpurchasedproduct", fetchController.mostpurchasedproduct);
router.get("/itemcustomer/:id", fetchController.customerpurchasedparticularitem);
router.get("/customerproducts/:id", fetchController.specificcustomerpurchase);

module.exports = router;