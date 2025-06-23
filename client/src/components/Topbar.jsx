import React, { use } from "react";
import logo from "@/assets/images/logo-white.png";
import { FaSignInAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import SearchBox from "@/components/SearchBox";
import { RouteIndex, RouterProfile, RouteSignin } from "@/helper/RouteName";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import usericon from "@/assets/images/user.png"; // Placeholder for user avatar
import { removeUser } from "@/redux/user/user.slice";
import { ShowToast } from "@/helper/showToast";
import { getEnv } from "@/helper/getEnv";

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogoout = async () => {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/logout`,
        {
          method: "get",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return ShowToast("error", data.message || "Something went wrong");
      }

      dispatch(removeUser(data.user));
      navigate(RouteIndex);
      ShowToast("success", "User registered successfully");
    } catch (error) {
      ShowToast("error", error.message || "Something went wrong");
      console.error("Error during registration:", error);
    }
  };

  const user = useSelector((state) => state.user);
  user.isLoggedIn = true; // For testing purposes, remove this line in production
  return (
    <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white shadow-md px-5 border-b border-gray-200">
      <div>
        <img src={logo} alt="" />
      </div>
      <div className="w-1/3 bg-gray-50">
        <SearchBox />
      </div>
      <div>
        {!user.isLoggedIn ? (
          <Button>
            <FaSignInAlt />
            <Link to={RouteSignin}>Sign In</Link>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user.user.avatar || usericon} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <p>{user.user.name}</p>
              </DropdownMenuLabel>
              <DropdownMenuLabel>
                <p className="text-sm">{user.user.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator  />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to={RouterProfile}>
                  <FaRegUser />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to="">
                  <CiSquarePlus />
                  Create Blog
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem  onClick={handleLogoout} className="cursor-pointer">
                <IoIosLogOut color="red" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Topbar;
