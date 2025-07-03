const mongoose = require("mongoose");

// Schema

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "user is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    phone: {
      type: String,
      required: [true, "phone no. is required"],
    },
    usertype: {
      type: String,
      required: false,
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740",
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  { timestamps: true }
);

//export

module.exports = mongoose.model("User", userSchema);
