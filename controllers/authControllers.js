const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, answer } = req.body;

    // validation

    if (!userName || !email || !password || !phone || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Provide all fields",
      });
    }

    // check user

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "User already exists",
      });
    }

    // hash password

    var salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // create new user
    const user = await userModel.create({
      userName,
      email,
      password: hashPassword,
      phone,
      answer,
    });
    res.status(201).send({
      success: true,
      message: "User Successfull Registered",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "All fields are required",
      });
    }

    // use if we wants to check password without hashing
    //const user = await userModel.findOne({ email: email, password: password });

    // with hashing
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found or Password Incorrect",
      });
    }

    // check user password comparison

    const ismatch = await bcrypt.compare(password, user.password);

    if (!ismatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // token

    // If we need to encrypt then sign function require
    //  and for decrypt we require verify function

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //console.log("JWT Secret being used to sign:", process.env.JWT_SECRET);

    user.password = undefined;

    res.status(200).send({
      success: true,
      message: "Successfully Login",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login API",
      error,
    });
  }
};

module.exports = { registerController, loginController };
