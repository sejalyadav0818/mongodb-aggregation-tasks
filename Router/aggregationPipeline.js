const express = require("express");
const router = express.Router();
const aggregationPipeline = require("../Controller/aggregationPipeline");

router.get("/aggregatesales", aggregationPipeline.aggregateSales);
router.get("/aggregatefunction", aggregationPipeline.aggregationFunctions);
module.exports = router;
