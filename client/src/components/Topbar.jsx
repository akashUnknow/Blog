import React from "react";
import logo from "@/assets/images/logo-white.png";
import { FaSignInAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SearchBox from "@/components/SearchBox";

const Topbar = () => {
  return (
    <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white shadow-md px-5 border-b border-gray-200">
      <div>
        <img src={logo} alt="" />
      </div>
      <div className="w-1/3 bg-gray-50">
        <SearchBox />
      </div>
      <div>
        <Button>
          <FaSignInAlt />
          <Link>
          Sign In</Link>
        </Button>
      </div>
    </div>
  );
};

export default Topbar;
