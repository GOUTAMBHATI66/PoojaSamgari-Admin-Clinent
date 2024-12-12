import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserForm from "../profile/UserForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/context/AuthContext";

const ShippingAddress = ({ products }) => {
  const [isOpen, setIsOpen] = useState();
  const { authUser } = useAuth();
  const navigate = useNavigate();
  const onCheckout = () => {
    navigate("/checkout");
  };
  false;
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="bg-foreground w-full rounded-full p-2 text-base font-bold text-muted px-2">
        Buy{" "}
      </DialogTrigger>
      <DialogContent className="p-1 bg-secondary w-full md:w-1/2 ">
        <DialogHeader>
          <DialogDescription>
            <UserForm />
            <Button
              className="w-full  bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300"
              disabled={!authUser.street || products.length === 0}
              onClick={onCheckout}
            >
              <p className="hover:translate-x-2 transition-all">
                CHECKOUT {">"}
              </p>
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ShippingAddress;
