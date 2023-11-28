const express = require("express");
const router = express.Router();
const app = express();
app.use(express.json());
router.get("/demo", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000);
console.log("Server started on port 3000");
module.exports = router;
