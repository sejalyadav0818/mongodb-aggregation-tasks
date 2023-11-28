# E-Commerce System Schema Design:

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  addresses: [{ street: String, city: String, zipCode: String }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { street: String, city: String, zipCode: String },
  menu: [menuItemSchema],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

const orderItemSchema = new mongoose.Schema({
  menuItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuItem",
    required: true,
  },
  quantity: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Pending", "Preparing", "Out for Delivery", "Delivered"],
    default: "Pending",
  },
});

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: String,
  date: { type: Date, default: Date.now },
});
