const express = require("express");
const router = express.Router();
const productsController = require("../Controller/productsController");

router.post("/products", productsController.createProduct); 
router.get("/products/:id", productsController.readProduct);
router.get("/products", productsController.readAllProducts);
router.delete("/products/:id", productsController.deleteProduct);

module.exports = router;

