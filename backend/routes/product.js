const express = require("express");
const router = express.Router();
const ProductController = require("../controller/product-controller");

router.post("/product", ProductController.createproduct);
router.get("/product", ProductController.fetchProduct);
router.get("/product/:id", ProductController.fetchSingleProduct);
router.put("/product/:id", ProductController.updateproduct);
router.delete("/product/:id", ProductController.deleteSingleProduct);

module.exports = router;
