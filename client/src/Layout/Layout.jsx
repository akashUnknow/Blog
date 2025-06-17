import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/AppSidebar";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";

const Layout = () => {
  return (
    // topbar
    <SidebarProvider>
      <Topbar />
      <AppSidebar />
      {/* <AppTopbar/> */}
      <main className=" w-full">
        <div className="w-full min-h-[calc(100vh-40px)]">

        <Outlet />
        </div>
        <Footer />
      </main>
    </SidebarProvider>
  );
};

export default Layout;
