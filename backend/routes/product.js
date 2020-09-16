const express = require('express');
const router = express.Router();
const db = require("../db");
const multer = require('multer');
const ProductController = require("../controller/product-controller");

//const Auth = require("../middleware/check-auth")





router.post("/product", ProductController.createproduct);
router.get("/product", ProductController.fetchProduct);
router.get("/product/:id", ProductController.fetchSingleProduct);
router.put("/product/:id", ProductController.updateproduct);
router.delete("/product/:id", ProductController.deleteSingleProduct);


//router.post("/sellerlogin", sellerController.sellerlogin);


module.exports = router;