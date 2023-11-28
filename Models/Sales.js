const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", 
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    quantity: {
      type: Number,
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sales", salesSchema);
