const mongoose = require("mongoose");

//schema
const ordersSchema = new mongoose.Schema(
  {
    foods: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Foods",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    payment: {
      type: Number,
      required: true,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["preparing", "prepare", "on the way", "deliverd"],
      default: "preparing",
    },
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("Orders", ordersSchema);
