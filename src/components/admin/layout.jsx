import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "./component/AppSidebar";
import { Button } from "../ui/button";
import { IoMdAdd } from "react-icons/io";
import DynamicBreadcrumb from "../shared/DynamicBreadCrub";

const Layout = () => {
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className=" w-full flex flex-col">
        <nav className=" sticky top-0 inset-x-0 z-30 backdrop-blur-lg bg-secondary   flex items-center justify-between   border-b-2    p-1 px-4  w-full ">
          <div>
            <SidebarTrigger />
          </div>
          <DynamicBreadcrumb />
          <div>
            <Button onClick={() => navigate("/admin/products/create")}>
              <IoMdAdd /> <span className=" max-sm:hidden">Add Product</span>
            </Button>
          </div>
        </nav>
        <div className="p-2 px-3  bg-background flex-1 lg:p-3">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
