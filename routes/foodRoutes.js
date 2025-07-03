const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createFoodControllers,
  getAllFoodsControllers,
  getFoodByIDControllers,
  updateFoodControllers,
  deleteFoodControllers,
} = require("../controllers/foodControllers");

const router = express.Router();

// routes

// Create Food

router.post("/createFood", authMiddleware, createFoodControllers);

// Get All Foods

router.get("/getFoods", getAllFoodsControllers);

// Get Food by Id

router.get("/getFoodByID/:id", getFoodByIDControllers);

// Update Food

router.put("/updateFood/:id", updateFoodControllers);

// Delete Food

router.delete("/deleteFood/:id", deleteFoodControllers);
module.exports = router;
