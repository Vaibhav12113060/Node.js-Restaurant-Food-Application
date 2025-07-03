const categoryModel = require("../models/categoryModel");
const restaurantModel = require("../models/restaurantModel");

const createCategoryControllers = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    if (!title) {
      return res.status(500).send({
        success: "false",
        message: "All Fields are required",
      });
    }

    const exists = await categoryModel.findOne({ title });

    if (exists) {
      return res.status(500).send({
        success: "false",
        message: "Category Already Exists",
      });
    }

    const newCategory = new categoryModel({ title, imageUrl });
    await newCategory.save();

    res.status(200).send({
      success: "true",
      message: "Sucessfully created the Category",
      newCategory,
    });
  } catch (error) {
    return res.status(500).send({
      success: "false",
      message: "Error in Create Category API",
      error: error.message,
    });
  }
};

const getAllCategoryControllers = async (req, res) => {
  try {
    const cat = await categoryModel.find({});

    if (!cat) {
      return res.status(500).send({
        sucess: "false",
        message: "No Categories are there",
      });
    }

    res.status(200).send({
      success: "true",
      message: "Sucessfully fetched all the Categories",
      cat,
    });
  } catch (error) {
    return res.status(500).send({
      success: "false",
      message: "Error in Get All Category Controllers API",
      error: error.message,
    });
  }
};

const getSingleCategoryById = async (req, res) => {
  try {
    const cat = await categoryModel.findById(req.params.id);

    if (!cat) {
      return res.status(500).send({
        sucess: "false",
        message: "Category ID is Invalid",
      });
    }

    res.status(200).send({
      success: "true",
      message: "Successfully Fetched the Category",
      cat,
    });
  } catch (error) {
    return res.status(500).send({
      success: "false",
      message: "Error in Get Single Category API",
      error: error.message,
    });
  }
};

const updateCategoryControllers = async (req, res) => {
  try {
    const cat = await categoryModel.findById(req.params.id);

    if (!cat) {
      return res.status(500).send({
        success: "false",
        message: "No Category Found with this ID",
      });
    }

    const { title, imageUrl } = req.body;

    if (!title) {
      return res.status(500).send({
        success: "false",
        message: "All Fields are required",
      });
    }

    cat.title = title;

    res.status(200).send({
      success: "true",
      message: "Category Updated Successfully",
      cat,
    });
  } catch (error) {
    return res.status(500).send({
      success: "false",
      message: "Error in Update Category Contollers",
      error: error.message,
    });
  }
};

const deleteCategoryControllers = async (req, res) => {
  try {
    const cat = await categoryModel.findById(req.params.id);

    if (!cat) {
      return res.status(500).send({
        success: "false",
        message: "Category with this ID Not Found",
      });
    }

    await categoryModel.findByIdAndDelete(req.params.id);

    res.status(200).send({
      success: "true",
      message: "Category with Id Successfully deleted",
      deletedCat: cat,
    });
  } catch (error) {
    return res.status(500).send({
      success: "false",
      message: "Error in Delete Category API",
      error: error.message,
    });
  }
};

module.exports = {
  createCategoryControllers,
  getAllCategoryControllers,
  getSingleCategoryById,
  updateCategoryControllers,
  deleteCategoryControllers,
};
