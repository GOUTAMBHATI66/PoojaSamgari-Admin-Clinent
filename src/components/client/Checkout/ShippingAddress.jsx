import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import UserForm from "../profile/UserForm";
import { lazy, Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

const ShippingAddress = ({ products }) => {
  const UserForm = lazy(() => import("../profile/UserForm"));

  const [isOpen, setIsOpen] = useState();
  const { authUser } = useAuth();
  const navigate = useNavigate();

  const onCheckout = () => {
    navigate("/checkout");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Trigger Button */}
      <DialogTrigger className="bg-foreground w-full rounded-full py-3 px-4  text-base font-bold text-white hover:bg-red-900 transition-all">
        Buy
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className=" border-0 ring-0 w-full max-w-2xl md:max-w-4xl rounded-lg shadow-xl overflow-y-auto">
        <DialogHeader>
          <DialogDescription>
            <Suspense
              fallback={[...Array(6)].map((_, idx) => (
                <Skeleton key={idx} className="h-10 my-4  rounded-lg w-full" />
              ))}
            >
              <UserForm />
            </Suspense>

            {/* Checkout Button */}
            <div className="mt-2">
              <Button
                className="w-full py-3 text-lg font-semibold  text-white   rounded-full disabled:bg-gray-300 transition-all"
                disabled={!authUser?.street || products.length === 0}
                onClick={onCheckout}
              >
                CHECKOUT &gt;
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ShippingAddress;
