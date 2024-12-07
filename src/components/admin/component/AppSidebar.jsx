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

export function AppSidebar() {
  const items = [
    {
      title: "Dashboard",
      url: "/",
      icon: BsBarChartLine,
    },
    {
      title: "Products",
      url: "/products",
      icon: TbCategoryPlus,
    },
    {
      title: "Orders",
      url: "/orders",
      icon: LuClipboardPen,
    },
  ];

  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
  };

  return (
    <Sidebar
      collapsible="icon"
      variant="floating"
      className="bg-gray-100 dark:bg-gray-900"
    >
      <SidebarContent>
        <SidebarGroup className="border border-green-500">
          <SidebarGroupLabel className="text-xl text-gray-800 dark:text-gray-200">
            Admin Panel
          </SidebarGroupLabel>
          <SidebarGroupContent className="py-3 border border-red-500">
            <SidebarSeparator />

            <SidebarMenu className="py-2 flex flex-col border border-black items-stretch justify-between">
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
              logOut
            </SidebarMenu>

            <span className="text-end">LOGOUT</span>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
