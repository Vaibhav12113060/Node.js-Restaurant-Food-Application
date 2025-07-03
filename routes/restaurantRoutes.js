const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createRestaurant,
  getAllRestaurantController,
  getSingleRestaurant,
  deleteRestaurantControllers,
} = require("../controllers/restaurantController");

const router = express.Router();

// routed

// Create Restaurant

router.post("/createRestaurant", authMiddleware, createRestaurant);

// Get ALL Restaurant

router.get("/getAll", authMiddleware, getAllRestaurantController);

// Get Single Restaurant

router.get("/getOneRest/:id", authMiddleware, getSingleRestaurant);

// Delete Restaurant

router.delete("/deleteRest/:id", authMiddleware, deleteRestaurantControllers);
module.exports = router;
