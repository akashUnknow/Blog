import { handleError } from "../helper/handleError.js";
import User from "../models/User.model.js";
import bcryptjs from "bcryptjs";

export const getUser = async (req, res ,next) => {
  try {
    const {userid}= req.params;
    const user=await User.findOne({_id:userid}).lean().exec();
    if (!user) {
      next(handleError(404, "User not found"));
    }
    res.status(200).json({
        success: true,
        message: "User fetched successfully",
        user
    });
  } catch (error) {
    next(handleError(500, error.message || "Internal Server Error"));
  }
}

export const updateUser = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    const { userid } = req.params;
    const user=await User.findById(userid)
    user.name = data.name;
    user.email = data.email;
    user.bio = data.bio;

    if(data.password && data.password.length > 8) {
      const hashedPassword = bcryptjs.hashSync(data.password, 10);
      user.password = hashedPassword;
    }
    if (req.file) {
      const uploadResult=await cloudinary.uploader
      .upload(req.file.path, {
        folder: "mern-blog",
        resource_type: "image"
      }).catch((error) => {
        next(handleError(500, error.message || "Image upload failed"));
      });
      user.avatar=uploadResult.secure_url;
    }

    await user.save();
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user
    });
    
  } catch (error) {
    next(handleError(500, error.message || "Internal Server Error"));
  }
}
