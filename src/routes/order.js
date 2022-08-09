const express = require("express");
const router = express.Router();
const { getOrder, insertOrder } = require("../controller/order");

router.get("/orders", getOrder);
router.post("/order", insertOrder);

module.exports = router;
