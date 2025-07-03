const { model } = require("mongoose");
const orderModel = require("../models/orderModel");
const foodModel = require("../models/foodModel");

const createOrderControllers = async (req, res) => {
  try {
    const { cart, id } = req.body;

    // Validate request body
    if (!cart || !Array.isArray(cart) || cart.length === 0 || !id) {
      return res.status(400).send({
        success: false,
        message: "Cart and buyer ID are required.",
      });
    }

    let total = 0;
    const detailed_items = [];
    const foodsForDB = [];

    // Process each cart item
    for (const item of cart) {
      const food = await foodModel.findById(item._id);
      if (!food) continue;

      const quantity = item.quantity || 1;
      const itemSubtotal = food.price * quantity;
      total += itemSubtotal;

      // Store for order DB
      foodsForDB.push({
        _id: food._id,
        quantity: quantity,
      });

      // Prepare bill item
      detailed_items.push({
        id: food._id,
        title: food.title,
        description: food.description,
        quantity: quantity,
        unitPrice: food.price,
        subtotal: itemSubtotal,
      });
    }

    // If no valid food found
    if (foodsForDB.length === 0) {
      return res.status(400).send({
        success: false,
        message: "No valid food items found in cart.",
      });
    }

    // Create and save the order
    const newOrder = new orderModel({
      foods: foodsForDB,
      payment: total,
      buyer: id,
    });

    await newOrder.save();

    // Populate buyer info
    const populatedOrder = await orderModel
      .findById(newOrder._id)
      .populate("buyer");

    // Final response
    res.status(201).send({
      success: true,
      message: "Order Placed Successfully",
      orderID: populatedOrder._id,
      buyer: {
        id: populatedOrder.buyer._id,
        name: populatedOrder.buyer.userName,
        email: populatedOrder.buyer.email,
        phone: populatedOrder.buyer.phone,
        usertype: populatedOrder.buyer.usertype,
      },
      bill: {
        items: detailed_items,
        totalAmount: total,
      },
    });
  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).send({
      success: false,
      message: "Error in placing order",
      error: error.message,
    });
  }
};

// // CHANGE ORDER STATUS
const changeOrderStatusControllers = async (req, res) => {
  try {
    const order = orderModel.findById(req.params.id);

    if (!order) {
      return res.status(500).send({
        success: "false",
        message: "Invalid order ID",
      });
    }

    const { new_status } = req.body;

    if (!new_status) {
      return res.status(500).send({
        success: "false",
        message: "All Fields are required",
      });
    }

    const updated_order = await orderModel.findByIdAndUpdate(req.params.id, {
      status: new_status,
    });

    res.status(200).send({
      success: "true",
      message: "Successfully updated the Order Status",
    });
  } catch (error) {
    return res.status(500).send({
      success: "false",
      message: "Error in CHange Order Status API",
      error: error.message,
    });
  }
};

const getOrderControllers = async (req, res) => {
  try {
    const order = await orderModel.find({});

    if (!order) {
      return res.status(500).send({
        success: "false",
        message: "No orders are there",
      });
    }

    return res.status(200).send({
      success: "true",
      message: "Successfully fetched all the details of the Order",
      orders: order,
    });
  } catch (error) {
    return res.status(500).send({
      success: "false",
      message: "Error in Get Order API",
      error: error.message,
    });
  }
};

const getOrderByIdControllers = async (req, res) => {
  try {
    const { customerID } = req.params;

    if (!customerID) {
      return res.status(400).send({
        success: false,
        message: "Invalid Customer ID",
      });
    }

    const orders = await orderModel
      .find({ buyer: customerID })
      .populate("foods._id")
      .populate("buyer");

    if (!orders || orders.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No orders found for this customer ID",
      });
    }

    res.status(200).send({
      success: true,
      message: "Successfully fetched order details for the customer",
      orderDetails: orders,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Get Order BY ID API",
      error: error.message,
    });
  }
};

module.exports = {
  createOrderControllers,
  changeOrderStatusControllers,
  getOrderControllers,
  getOrderByIdControllers,
};
