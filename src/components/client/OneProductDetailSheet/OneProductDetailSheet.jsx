import React, { useState } from "react";
import ProductModal from "./ProductModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const OneProductDetailSheet = ({ slug }) => {

  // state for open and close a dialog
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddToCart = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger className="mt-4 bg-gradient-to-r from-amber-500 to-orange-500  text-white px-4 py-2 rounded-sm text-sm font-semibold w-full flex items-center justify-center"
          onClick={() => setDialogOpen(true)}>Know More</DialogTrigger>
        <DialogContent  className='p-4'>
        <ProductModal slug={slug} onAddToCart={handleAddToCart} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OneProductDetailSheet;
