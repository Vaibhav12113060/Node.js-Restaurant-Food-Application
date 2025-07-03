// GET USER INFO

const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

const getUserController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findOne({ _id: req.userId });

    // validation

    if (!user) {
      return res.status(500).send({
        success: "false",
        message: "User Not Found",
      });
    }

    // hide password
    user.password = undefined;

    res.status(201).send({
      success: "true",
      message: "User Get Successfully",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      success: "false",
      message: "Error in Get User API",
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.userId });

    if (!user) {
      return res.status(500).send({
        success: "false",
        message: "User Not Found",
        error,
      });
    }

    const { userName, email, phone } = req.body;

    if (userName) user.userName = userName;
    if (email) user.email = email;
    if (phone) user.phone = phone;

    // save user

    await user.save();

    res.status(200).send({
      success: "true",
      message: "User Updated Successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: "false",
      message: "Error in Update User Controller API",
      error,
    });
  }
};

const updatePasswordController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.userId });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Usre Not Found",
      });
    }

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: "false",
        message: "All fields are required",
      });
    }

    // check the old password is correct or not

    const checkpass = await bcrypt.compare(oldPassword, user.password);

    if (!checkpass) {
      return res.status(500).send({
        success: "false",
        message: "Incorrect Password!! Please Enter Correct Password",
      });
    }

    // hashing
    var salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashPassword;

    await user.save();

    res.status(200).send({
      success: "true",
      message: "Updated Password Successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: "false",
      message: "Error in Update Password Controller API ",
      error: error.message,
    });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;

    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: "false",
        message: "All fields are required",
      });
    }

    const user = await userModel.findOne({ email, answer });

    if (!user) {
      return res.status(500).send({
        success: "false",
        message: "Invalid Email or Answer",
      });
    }

    // hashing password

    var salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashPassword;
    await user.save();

    res.status(200).send({
      success: "true",
      message: "Reset Password Successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: "false",
      message: "Error in Reset Password API",
      error: error.message,
    });
  }
};

const deleteUserController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);

    res.status(200).send({
      success: "true",
      message: "Successfully deleted the user",
    });
  } catch (error) {
    return res.status(500).send({
      success: "false",
      message: "Error in delete User API",
      error: error.message,
    });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  resetPasswordController,
  updatePasswordController,
  deleteUserController,
};
