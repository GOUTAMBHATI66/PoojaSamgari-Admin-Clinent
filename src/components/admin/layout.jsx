import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "./component/AppSidebar";
import { Button } from "../ui/button";
import { IoAddOutline } from "react-icons/io5";


const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className=" w-full flex flex-col bg-secondary">
        <nav className=" sticky top-1 inset-x-0 z-30 backdrop-blur-lg border-b-2 border-muted-secondary flex items-center justify-between  rounded-l-lg    p-1 px-4  w-full ">
          <SidebarTrigger />

          <Button><IoAddOutline size={16} /> Add Product</Button>
        </nav>
        <div className="p-2 px-3  flex-1 lg:p-3">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
