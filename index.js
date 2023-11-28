const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
require("dotenv").config();
const productsRoute = require("./Router/productsRoute");
const salesRoutes = require("./Router/salesRoute");
const aggregate = require("./Router/aggregationPipeline");
const bodyPareser = require("body-parser");
app.use(bodyPareser.json());
const RateLImiter = require("express-rate-limit");
const apiLimiter = RateLImiter({
  windowMs: 15 * 60 * 1000, // 15 minutes15: The number of minutes. 60: The number of seconds in a minute.1000: The number of milliseconds in a second.
  max: 200, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
// Rate Limiter
app.use("/products", apiLimiter);
app.use("/sales", apiLimiter);

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).send({ error: "Invalid JSON" });
  }
  next(err);
});

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });

app.use(express.json());
app.use(productsRoute);
app.use(salesRoutes);
app.use(aggregate);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
