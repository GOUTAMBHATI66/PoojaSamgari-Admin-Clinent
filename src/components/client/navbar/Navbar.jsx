import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import AddtoCartSheet from "../AddtoCart/AddtoCartSheet";
import { useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
const Navbar = () => {
  const { products, status } = useSelector((state) => state.cartSlice);

  return (
    <nav className=" backdrop-blur-lg backdrop-filter  sticky top-0 z-50">
      <div className="h-14 flex items-center justify-between container">
        <Link to={"/"} className="text-xl font-bold font-serif text-orange-600">
          <img src="/logo.png" alt="Company Logo" className="w-10 h-auto" />
        </Link>

        <div className="flex items-center justify-center gap-x-4">
          <div className="relative ">
            <AddtoCartSheet />
            {status === "loading" ? (
              <Skeleton className="w-5 h-5 rounded-full absolute top-[-13px] right-[-10px]" />
            ) : (
              products.length > 0 && (
                <span className="rounded-full  font-bold flex items-center  justify-center uppercase my-auto p-1 absolute top-[-13px] right-[-10px] bg-muted-foreground text-white text-xs  w-5 h-5">
                  {products.length}
                </span>
              )
            )}
          </div>
          <Link to="/profile">
            <FiUser
              size={24}
              className="text-orange-600 hover:text-orange-500  cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
