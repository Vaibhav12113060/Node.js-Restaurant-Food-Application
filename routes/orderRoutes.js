const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createOrderControllers,
  changeOrderStatusControllers,
  getOrderControllers,
  getOrderByIdControllers,
} = require("../controllers/orderControllers");

const router = express.Router();

// routes

// Create order

router.post("/createOrder", authMiddleware, createOrderControllers);

// // CHANGE ORDER STATUS

router.put("/changeStatus/:id", authMiddleware, changeOrderStatusControllers);

// Get All Order Details

router.get("/getOrders", authMiddleware, getOrderControllers);

// Get Order By Customer ID

router.get(
  "/getOrderById/:customerID",
  authMiddleware,
  getOrderByIdControllers
);

module.exports = router;
