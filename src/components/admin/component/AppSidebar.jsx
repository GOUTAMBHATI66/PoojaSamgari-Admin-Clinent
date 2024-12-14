import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TbCategoryPlus } from "react-icons/tb";
import { BsBarChartLine } from "react-icons/bs";
import { LuClipboardPen } from "react-icons/lu";
import { Loader, LucideLogOut } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "@/components/context/AuthContext";
import useLogout from "@/hooks/useLogout";

export function AppSidebar() {
  const { authUser } = useAuth();
  const { isPending, handleLogout } = useLogout();

  const items = [
    {
      title: "Dashboard",
      url: "/admin",
      icon: BsBarChartLine,
    },
    {
      title: "Products",
      url: "/admin/products",
      icon: TbCategoryPlus,
    },
    {
      title: "Orders",
      url: "/admin/orders",
      icon: LuClipboardPen,
    },
  ];

  return (
    <Sidebar
      collapsible="icon"
      variant="floating"
      className="bg-secondary ring-0"
    >
      <SidebarContent className="ring-0 bg-[#f5f2e9]  z-50">
        <SidebarGroup className="h-full">
          <SidebarGroupLabel className="flex items-center justify-between">
            <img
              src="/logo.png"
              alt="Company Logo"
              className="w-10 p-1   object-contain"
            />
            <span className="text-sm text-red-500 font-serif">Admin</span>
          </SidebarGroupLabel>
          <SidebarGroupContent className="py-3 mt-3  ">
            <SidebarSeparator />

            <SidebarMenu className="py-2 flex flex-col items-stretch justify-between">
              {items.map((item) => {
                const location = useLocation();
                const isActive = location.pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={item.url}>
                        <item.icon
                          className={` hover:text-muted-foreground ${
                            isActive
                              ? "text-muted-foreground "
                              : "text-gray-500"
                          }`}
                        />
                        <span
                          className={`text-base font-semibold hover:text-muted-foreground ${
                            isActive
                              ? " text-muted-foreground  "
                              : "text-gray-500"
                          }`}
                        >
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <footer className="mt-0">
          <SidebarMenuButton asChild>
            <div className="flex items-center">
              <FaUserCircle className="w-16 h-16 text-gray-700" />
              <span className="flex flex-col items-end">
                <p className="text-lg font-semibold text-gray-800">
                  {authUser?.name || "User Name"}
                </p>
              </span>
            </div>
          </SidebarMenuButton>

          <SidebarMenuButton onClick={handleLogout}>
            {isPending ? (
              <Loader className="animate-spin" size={15} />
            ) : (
              <LucideLogOut size={16} />
            )}{" "}
            <span>Logout</span>
          </SidebarMenuButton>
        </footer>
      </SidebarContent>
    </Sidebar>
  );
}
