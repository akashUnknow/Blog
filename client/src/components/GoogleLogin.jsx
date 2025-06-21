import React from "react";
import { Button } from "./ui/button";
import { FaGoogle } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/helper/firebase";
import { ShowToast } from "@/helper/showToast";
import { RouteIndex } from "@/helper/RouteName";
import { useNavigate } from "react-router-dom";
import { getEnv } from "@/helper/getEnv";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";

const GoogleLogin = () => {
    const navigate = useNavigate();
  const handleLogin = async () => {
    const dispatch = useDispatch();
    try {
      const googleResponce = await signInWithPopup(auth, provider);
      const user=googleResponce.user;
      const bodyData = {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/google-login`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(bodyData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return ShowToast("error", data.message || "Something went wrong");
      }
      dispatch(setUser(data.user));
      navigate(RouteIndex);
      ShowToast("success", "User registered successfully");
    } catch (error) {
      ShowToast("error", error.message || "Something went wrong");
      console.error("Error during registration:", error);
    }
  };
  return (
    <Button variant="outline" className="w-full" onClick={handleLogin}>
      <FaGoogle />
      Continue with Google
    </Button>
  );
};

export default GoogleLogin;
