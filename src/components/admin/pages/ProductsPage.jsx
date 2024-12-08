import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import AxiosBase from "@/lib/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdOutlinePublishedWithChanges,
  MdOutlineUnpublished,
} from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)

    setTimeout(() => {
      const product = async () => {
        try {
          const { data } = await AxiosBase.get("/api/admin/products");
          if (!data.success) throw new Error();
          setProducts(data.data);
          setIsLoading(false)
        } catch (error) {
          console.log(error);
          setProducts([]);
        }
      };
      product();
    }, 3000)
    

  }, []);

  return (
    <main>
      <h2 className=" text-black font-bold text-2xl mb-4 bg-white text-center py-2 rounded-sm">
        All Products
      </h2>

      {isLoading ? ( <span>Loading...</span> )

      : (
        <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Category</TableHead>
           
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow
              // onClick={() => handleClick(product.id)}
              key={product.id}
              className="cursor-pointer"
            >
              <TableCell className="text-xs">{index + 1}</TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>&#8377;{product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell >
                <HoverCard>
                  <HoverCardTrigger>
                    <CiEdit onClick={() => navigate(`/admin/product/edit/${product.slug}`)} size={20} />
                  </HoverCardTrigger>
                  <HoverCardContent> Edit </HoverCardContent>
                </HoverCard>
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger>
                  <MdDelete size={20} color="red"/>
                    
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action will permanently delete that product and
                        remove it's data from our servers.
                      </DialogDescription>
                      <Button variant="custome">Confirm</Button>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </TableCell>

              <TableCell>
                {product.isPublished ? (
                  <HoverCard>
                    <HoverCardTrigger>
                      <MdOutlinePublishedWithChanges size={20} color="blue" />
                    </HoverCardTrigger>
                    <HoverCardContent> Published </HoverCardContent>
                  </HoverCard>
                ) : (
                  <HoverCard>
                    <HoverCardTrigger>
                      <MdOutlineUnpublished size={20} color="gray" />
                    </HoverCardTrigger>
                    <HoverCardContent> Unpublished </HoverCardContent>
                  </HoverCard>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button
        className="fixed right-5 sm:right-10 bottom-10"
        onClick={() => navigate("/admin/products/create")}
      >
        <IoMdAdd /> <span className="max-sm:hidden">Add Product</span>
      </Button>
      </>
        )}
    </main>
  );
};

export default ProductsPage;
