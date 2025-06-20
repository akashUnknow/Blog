import User from "../models/user.model.js";
import { handleError } from "../helper/handleError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const Register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      // "User already exists"
      next(handleError(409, "User already exists"));
    }

    //hash password
    const hashedPassword = bcrypt.hashSync(password);

    // register
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    next(handleError(500, error.message || "Internal Server Error"));
  }
};
export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      next(handleError(404, "User not found"));
    }
    const hashedPassword = user.password;
    const comparePassword = bcrypt.compareSync(password, hashedPassword);
    if (!comparePassword) {
      next(handleError(404, "Invalid credentials"));
    }
    // Generate token logic here (not implemented in this snippet)
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      process.env.JWT_SECRET
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
      path: "/",
    });
    const newUser=user.toObject({getters: true});
    delete newUser.password; // Remove password from the user object before sending it in the response

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      newUser,
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(handleError(500, error.message || "Internal Server Error"));
  }
};
