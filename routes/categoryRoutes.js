const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createCategoryControllers,
  getAllCategoryControllers,
  getSingleCategoryById,
  updateCategoryControllers,
  deleteCategoryControllers,
} = require("../controllers/categoryControllers");

const router = express.Router();

// routes

// Create CAT

router.post("/createCat", authMiddleware, createCategoryControllers);

// Get All Cat

router.get("/getAllCat", authMiddleware, getAllCategoryControllers);

// Get Single Cat by Id
router.get("/getcatbyId/:id", authMiddleware, getSingleCategoryById);

// Update Category

router.post("/updateCat/:id", authMiddleware, updateCategoryControllers);

// Delete Category

router.delete("/deleteCat/:id", authMiddleware, deleteCategoryControllers);

module.exports = router;
