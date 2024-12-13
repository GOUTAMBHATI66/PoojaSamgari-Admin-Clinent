import { Link, Outlet, useNavigate } from "react-router-dom";
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
      <main className="w-full h-screen overflow-x-hidden">
        <nav className="h-[80px] sticky top-0 backdrop-blur-lg z-50 bg-secondary  p-1  w-full ">
          <div className=" flex items-center justify-between">
            <SidebarTrigger />

            <Link to="/">
              {" "}
              <span className="text-base font-semibold text-gray-700 hover:text-white hover:bg-primary rounded-sm transition-colors duration-300 py-1 px-2">
                Client View
              </span>{" "}
            </Link>
            <div>
              <Button onClick={() => navigate("/admin/products/create")}>
                <IoMdAdd /> <span className=" max-sm:hidden">Add Product</span>
              </Button>
            </div>
          </div>
          <section className=" z-20">
            <DynamicBreadcrumb />
          </section>
        </nav>

        <div className="p-2 px-3 bg-background flex-1 lg:p-3">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;