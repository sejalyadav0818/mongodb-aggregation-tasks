const express = require("express");
const Sales = require("../Models/Sales");

// Get all sales
module.exports.aggregateSales = async (req, res) => {
  const aggregationPipeline = [
    {
      $lookup: {
        from: "products",
        localField: "product",
        foreignField: "_id",
        as: "productInfo",
      },
    },
    {
      $unwind: "$productInfo",
    },
    {
      $group: {
        product_name: "$productInfo.product",
        totalSales: { $sum: "$quantity" },
        averagePrice: { $avg: "$productInfo.price" },
      },
    },
  ];

  const result = await Sales.aggregate(aggregationPipeline);

  if (result.length > 0) {
    const aggregatedData = result[0];
    res.json(aggregatedData);
  } else {
    res.json({ message: "No data found for aggregation." });
  }
};

module.exports.aggregationFunctions = async (req, res) => {
  console.log("jdoiewjfoihefwoofehhfeoihFwoqpp");
  try {
    const { minDate, maxDate, limit, sortBy } = req.query;
    console.log("hdewiuhfioewgfo");
    console.log("daewdfef", req.query);
    const aggregationPipelinee = [
      {
        $match: {
          date: {
            $gte: minDate ? new Date(minDate) : new Date(0),
            $lte: maxDate ? new Date(maxDate) : new Date(),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$quantity" },
        },
      },
    ];

    if (sortBy) {
      aggregationPipelinee.push({ $sort: { [sortBy]: 1 } });
    }

    // Add limit stage if limit is specified
    if (limit) {
      aggregationPipelinee.push({ $limit: parseInt(limit) });
    }

    const results = await Sales.aggregate(aggregationPipelinee);

    if (results.length > 0) {
      const aggregatedDataa = results[0];
      res.json(aggregatedDataa);
    } else {
      res.json({ message: "No data found for aggregation." });
    }
  } catch (error) {
    console.error("Aggregation error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// 1. Calculate total sales for each product
const totalSalesPipeline = [
  {
    $group: {
      _id: "$product",
      totalSales: { $sum: "$quantity" },
    },
  },
];

const averagePricePipeline = [
  {
    $group: {
      _id: "$product",
      averagePrice: { $avg: "$price" },
    },
  },
];

const topSellingProductsPipeline = [
  {
    $group: {
      _id: "$product",
      totalSales: { $sum: "$quantity" },
    },
  },
  {
    $sort: { totalSales: -1 },
  },
  {
    $limit: 1,
  },
];

const executePipelines = async () => {
  try {
    const totalSalesResult = await Sales.aggregate(totalSalesPipeline);
    console.log("Total Sales:", totalSalesResult);

    const averagePriceResult = await Sales.aggregate(averagePricePipeline);
    console.log("Average Price:", averagePriceResult);

    const topSellingProductsResult = await Sales.aggregate(
      topSellingProductsPipeline
    );
    console.log("Top Selling Products:", topSellingProductsResult);
  } catch (error) {
    console.error("Aggregation error:", error);
  }
};

executePipelines();
