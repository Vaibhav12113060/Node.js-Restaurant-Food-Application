const foodModel = require("../models/foodModel");
require("../models/restaurantModel");
require("../models/categoryModel");

const createFoodControllers = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      restaurant,
      rating,
    } = req.body;

    if (!title || !description || !price || !catgeory || !restaurant) {
      return res.status(500).send({
        success: false,
        message: "Please Provide all fields",
      });
    }
    const newFood = new foodModel({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      restaurant,
      rating,
    });

    await newFood.save();
    // res.status(201).send({
    //   success: true,
    //   message: "New Food Item Created",
    //   newFood,
    // });

    const populatedFood = await foodModel
      .findById(newFood._id)
      .populate("catgeory")
      .populate("restaurant");

    res.status(201).send({
      success: true,
      message: "New Food Item Created",
      newFood: populatedFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create food api",
      error: error.message,
    });
  }
};

const getAllFoodsControllers = async (req, res) => {
  try {
    const food = await foodModel.find({});

    if (!food) {
      return res.status(500).send({
        success: "false",
        message: "No Foods are there",
      });
    }

    res.status(200).send({
      success: "true",
      message: "Successfully fetches all Items",
      food,
    });
  } catch (error) {
    return res.status(500).send({
      success: "false",
      message: "Error in Get All Foods Controllers",
      error: error.message,
    });
  }
};

const getFoodByIDControllers = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id);

    if (!food) {
      return res.status(500).send({
        success: "false",
        message: "Food with this ID is Invalid",
      });
    }

    res.status(200).send({
      success: "true",
      message: "Successfully fetched the details of Food ID",
      food,
    });
  } catch (error) {
    return res.status(500).send({
      success: "false",
      message: "Error in Get Food by ID API",
      error: error.message,
    });
  }
};

const updateFoodControllers = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id);

    if (!food) {
      return res.status(500).send({
        success: "false",
        message: "Food with this ID is not valid",
      });
    }

    const { new_description, new_price } = req.body;

    if (!new_description || !new_price) {
      return res.status(500).send({
        success: "false",
        message: "All Fields are required",
      });
    }

    // food.description = new_description;
    // food.price = new_price;

    const updated_food = await foodModel.findByIdAndUpdate(req.params.id, {
      description: new_description,
      price: new_price,
    });
    res.status(200).send({
      success: "true",
      message: "Successfully Updated the Food",
      updated_food,
    });
  } catch (error) {
    return res.status(500).send({
      success: "false",
      message: "Error in Update Food Controller API",
      error: error.message,
    });
  }
};

const deleteFoodControllers = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id);

    if (!food) {
      return res.status(500).send({
        success: "false",
        message: "Food ID Invalid",
      });
    }

    await foodModel.findByIdAndDelete(req.params.id);

    res.status(200).send({
      success: "true",
      message: "Successfully deleted the food",
    });
  } catch (error) {
    return res.status(500).send({
      success: "false",
      message: "Error in Delete Food Controllers API",
      error: error.message,
    });
  }
};

module.exports = {
  createFoodControllers,
  getAllFoodsControllers,
  getFoodByIDControllers,
  updateFoodControllers,
  deleteFoodControllers,
};
