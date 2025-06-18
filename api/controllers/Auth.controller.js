
import User from "../models/User.js";

export const Register = async(req, res) => {
   try {
     const { name, email, password } = req.body;
     const checkUser = await User.findOne({ email });
        if (checkUser) {
        // "User already exists"
        }
        // register

   } catch (error) {
    
   }
    
}
export const Login = async(req, res) => {}