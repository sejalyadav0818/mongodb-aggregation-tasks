const Products = require("../Models/Products");

module.exports.createProduct = async (req, res) => {
  console.log("hdihewiewfiogeifwo");
  try {
    const existingProducts = await Products.findOne({
      product: req.body.product,
    });
    console.log("hdihewiewfiogeifwo");
    if (existingProducts) {
      return res
        .status(400)
        .json({ message: "A Products with this email already exists." });
    }

    const product = new Products(req.body);
    await product.save();

    const createdProducts = await Products.findById(product._id);
    res.status(201).json({
      message: "Products created successfully",
      Products: {
        id: createdProducts._id,
        product: createdProducts.product,
        category: createdProducts.category,
        price: createdProducts.price,
        createdAt: createdProducts.createdAt,
        updatedAt: createdProducts.updatedAt,
        deleteUser: createdProducts.deleteProducts,
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

module.exports.readProduct = async (req, res) => {
  try {
    const products = await Products.findById(req.params.id);
    if (!products) return res.status(404).send();
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    // Soft delete by updating 'deletedAt' field
    const product = await Products.findByIdAndUpdate(
      req.params.id,
      { deletedAt: Date.now() },
      { new: true }
    );
    if (!product) return res.status(404).send();
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.readAllProducts = async (req, res) => {
  try {
    const product = await Products.find({});
    if (!product) return res.status(404).send();
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};
