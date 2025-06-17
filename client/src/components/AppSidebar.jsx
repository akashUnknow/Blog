import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenu,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import logo from "@/assets/images/logo-white.png";
import { BiSolidCategory } from "react-icons/bi";
import { FaComments,FaUserAlt ,FaBlog,FaHome} from "react-icons/fa";
import { GoDotFill } from "react-icons/go";


export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="bg-white">
        {" "}
        <img src={logo} width={120} />
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarMenu>
            {/* home */}
            <SidebarMenuItem>
              <SidebarMenuButton>
                <FaHome />
                <Link to="">Home</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             {/* categories */}
            <SidebarMenuItem>
              <SidebarMenuButton>
                <BiSolidCategory />
                <Link to="">categories</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* blog */}
            <SidebarMenuItem>
              <SidebarMenuButton>
                <FaBlog />
                <Link to="">Blogs</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* comments */}

            <SidebarMenuItem>
              <SidebarMenuButton>
                <FaComments />
                <Link to="">comments</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* User */}
            <SidebarMenuItem>
              <SidebarMenuButton>
                <FaUserAlt />
                <Link to="">User</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

           {/* ===================== */}


          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>categories</SidebarGroupLabel>
          <SidebarMenu>
            {/* home */}
            <SidebarMenuItem>
              <SidebarMenuButton>
                <GoDotFill />
                <Link to="">categories item</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
     
    </Sidebar>
  );
}
export default AppSidebar;
