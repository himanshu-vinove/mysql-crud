const express = require('express');
const router = express.Router();
const db = require("../db");
const OrderController = require("../controller/order-controller");



router.post("/order", OrderController.createOrder);
router.get("/order/:id", OrderController.fetchOrder);
router.put("/order/:id", OrderController.updateorder);
router.delete("/order/:id", OrderController.deleteOrder);


module.exports = router;