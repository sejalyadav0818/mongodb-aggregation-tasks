const express = require("express");
const router = express.Router();
const salesController = require("../Controller/salesController");


router.post("/sales", salesController.createSales);
router.get("/sales/:id", salesController.readSales);
router.get("/sales", salesController.readAllSales);
router.delete("/sales/:id", salesController.deleteSales);

module.exports = router;



