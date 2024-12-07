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
import { useState } from "react";

export function AppSidebar() {
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

  const navigate = useNavigate();
  const [isPending, setisPending] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
  };

  return (
    <Sidebar collapsible="icon" variant="floating" className="bg-secondary">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl text-red-400 ">
            Shree Admin
          </SidebarGroupLabel>
          <SidebarGroupContent className="py-3  ">
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
                          className={` ${
                            isActive ? "text-blue-500 " : "text-gray-700"
                          } dark:${
                            isActive ? "text-blue-300" : "text-gray-300"
                          }`}
                        />
                        <span
                          className={`text-base font-semibold ${
                            isActive
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-gray-800 dark:text-gray-200"
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
        <SidebarFooter className="mt-0">
          <SidebarMenuButton onClick={handleLogout}>
            {isPending ? (
              <Loader className="animate-spin" size={15} />
            ) : (
              <LucideLogOut size={16} />
            )}{" "}
            <span>Logout</span>
          </SidebarMenuButton>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
