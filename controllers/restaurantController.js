// importing model

const restaurantModel = require("../models/restaurantModel");

const createRestaurant = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    // validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "please provide title and address",
      });
    }

    // checking for already exists or not

    const existingRest = await restaurantModel.findOne({ title });

    if (existingRest) {
      return res.status(500).send({
        success: "false",
        message: "Restaurant Already Exists",
      });
    }

    const rest = restaurantModel.create({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    res.status(200).send({
      success: "true",
      message: "Restaurant Successfully Created",
    });
  } catch (error) {
    return res.status(500).send({
      success: "false",
      message: "Error in Create Restaurant API",
      error: error.message,
    });
  }
};

//  Get all Restaurant

const getAllRestaurantController = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find({});

    if (!restaurants) {
      return res.status(500).send({
        success: "false",
        message: "Restaurant Does't exists",
      });
    }

    res.status(200).send({
      success: "true",
      message: "Successfully fetch all Restaurants",
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    return res.status(500).send({
      success: "false",
      message: "Error in Get ALL Rest. API",
      error: error.message,
    });
  }
};

const getSingleRestaurant = async (req, res) => {
  try {
    //const rest = await restaurantModel.findOne({ _id: req.userId });
    const rest = await restaurantModel.findById(req.params.id);
    if (!rest) {
      return res.status(500).send({
        success: "false",
        message: "Not Exists with this User ID",
      });
    }

    res.status(201).send({
      success: "true",
      message: "Restaurant Get Successfully",
      rest,
    });
  } catch (error) {
    return res.status(500).send({
      success: "false",
      message: "Error in Single Restaurant API",
      error: error.message,
    });
  }
};

const deleteRestaurantControllers = async (req, res) => {
  try {
    const rest = await restaurantModel.findById(req.params.id);
    if (!rest) {
      return res.status(404).send({
        success: false,
        message: "No Resturant Found OR Provide Resturant ID",
      });
    }

    await restaurantModel.findByIdAndDelete(req.params.id);

    res.status(200).send({
      success: "true",
      message: "Successfully Deleted the Restaurant",
      rest,
    });
  } catch (error) {
    return res.status(500).send({
      success: "false",
      message: "Error in Delete Restaurant API",
      error: error.message,
    });
  }
};

module.exports = {
  createRestaurant,
  getAllRestaurantController,
  getSingleRestaurant,
  deleteRestaurantControllers,
};
