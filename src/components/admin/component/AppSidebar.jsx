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
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg text-gray-800 dark:text-gray-200">
            Admin Panel
          </SidebarGroupLabel>
          <SidebarGroupContent className="py-3">
            <SidebarSeparator />

            <SidebarMenu>
              {items.map((item) => {
                const location = useLocation();
                const isActive = location.pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={item.url}>
                        <item.icon
                          className={`${
                            isActive ? "text-blue-500" : "text-gray-700"
                          } dark:${
                            isActive ? "text-blue-300" : "text-gray-300"
                          }`}
                        />
                        <span
                          className={`text-md font-semibold ${
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
      </SidebarContent>
    </Sidebar>
  );
}
