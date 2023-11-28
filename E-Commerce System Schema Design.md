# E-Commerce System Schema Design


1. **User Schema:**
   - Each user has a unique username, email, password, and can have multiple addresses.

```javascript
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  addresses: [{ street: String, city: String, zipCode: String }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

const User = mongoose.model('User', userSchema);
```

2. **Restaurant Schema:**
   - Each restaurant has a name, address, menu items, and can have multiple reviews.

```javascript
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true }
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { street: String, city: String, zipCode: String },
  menu: [menuItemSchema],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
```

3. **Order Schema:**
   - Each order is associated with a user, contains multiple items, and has a status.

```javascript
const orderItemSchema = new mongoose.Schema({
  menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
  quantity: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Preparing', 'Out for Delivery', 'Delivered'], default: 'Pending' }
});

const Order = mongoose.model('Order', orderSchema);
```

4. **Review Schema:**
   - Users can leave reviews for both restaurants and delivery personnel.

```javascript
const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: String,
  date: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);
```
