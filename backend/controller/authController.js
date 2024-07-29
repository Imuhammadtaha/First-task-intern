import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import { comparePassword, hashPassword } from "../helper/authHelper.js";

/********************************  
|                               |
|  1. FOR SIGN UP               |
|                               |
********************************/
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    //VALIDATIONS
    if (!name || !email || !password || !phone) {
      return res.send({ message: "ALL credentials are required" });
    }

    /*-------------------CHECK FOR VALIDATION------------------*/
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User with these email already exists!",
      });
    }

    /*-----------*******HASHING PASSWORD*******-------------*/
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      phone,
      password: hashedPassword,
    }).save();
    res.status(200).send({
      success: true,
      message: "Sign Up Successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

/********************************  
|                               |
|  2. LOGIN                     |
|                               |
********************************/
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Email or Password is incorrect",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    /*--=-=-=-=-=-=--=> COMPARING PASSWORD <==-=-=-=-=-=--=-= */
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(404).send({
        success: false,
        message: "Password is incorrect",
      });
    }
    /*-=----=--=---=---------=>TOKEN ASSINGING <=-=-=-=--=-=-=-=-=-=--=*/
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};
