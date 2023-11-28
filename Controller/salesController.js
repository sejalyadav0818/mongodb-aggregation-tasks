const Sales = require("../Models/Sales");

module.exports.createSales = async (req, res) => {
  try {
    // const existingSales = await Sales.findOne({ product: req.body.product });
    // if (existingSales) {
    //   return res
    //     .status(400)
    //     .json({ message: "A Sales with this email already exists." });
    // }

    const sales = new Sales(req.body);
    await sales.save();

    const createdSales = await Sales.findById(sales._id);

    res.status(201).json({
      message: "Sales created successfully",
      Sales: {
        id: createdSales._id,
        quantity: createdSales.quantity,
        createdAt: createdSales.createdAt,
        updatedAt: createdSales.updatedAt,
        deleteSales: createdSales.deleteSales,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Invalid user data.", details: error.errors });
    }

    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

module.exports.readSales = async (req, res) => {
  try {
    const foundSales = await Sales.findById(req.params.id);
    if (!foundSales) return res.status(404).send();
    res.send(foundSales);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.deleteSales = async (req, res) => {
  try {
    // Soft delete by updating 'deletedAt' field
    const sales = await Sales.findByIdAndUpdate(
      req.params.id,
      { deletedAt: Date.now() },
      { new: true }
    );
    if (!sales) return res.status(404).send();
    res.send(sales);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.readAllSales = async (req, res) => {
  try {
    const sales = await Sales.find({});
    if (!sales) return res.status(404).send();
    res.send(sales);
  } catch (error) {
    res.status(500).send(error);
  }
};

