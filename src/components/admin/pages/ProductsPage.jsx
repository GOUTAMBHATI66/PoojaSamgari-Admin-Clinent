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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import AxiosBase from "@/lib/axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MdOutlinePublishedWithChanges,
  MdOutlineUnpublished,
} from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Skeleton } from "@/components/ui/skeleton";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // get all products
  const productsArr = async () => {
    try {
      setIsLoading(true);
      const { data } = await AxiosBase.get("/api/admin/products");
      if (!data.success) throw new Error();
      setProducts(data.data);
    } catch (error) {
      console.log(error.message);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    productsArr();
  }, []);


  // delete a product
  const handleDeleteProduct = async (id) => {
    try {
      const {data} = await AxiosBase.delete(`/api/admin/product/delete/${id}`)
      if (!data.success) throw new Error();
      console.log(data)
    } catch (error) {
      console.log(error.message)
    }

    productsArr();
  };

  return (
    <main>
      <h2 className="text-black font-bold text-2xl mb-4 bg-white text-center py-2 rounded-sm">
        All Products
      </h2>

      {isLoading && <Skeleton className="h-20 w-full" />}

      {!isLoading && products.length === 0 && (
        <p className="text-center text-2xl font-bold">
          Currently, there are no products available.
        </p>
      )}

      {products.length > 0 && !isLoading && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={product.id} className="cursor-pointer">
                <TableCell className="text-xs">{index + 1}</TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>&#8377;{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <div className="flex gap-5  items-center space-x-2">
                    <HoverCard>
                      <HoverCardTrigger>
                        <CiEdit
                          size={20}
                          onClick={() =>
                            navigate(`/admin/product/edit/${product.slug}`)
                          }
                        />
                      </HoverCardTrigger>
                      <HoverCardContent>Edit</HoverCardContent>
                    </HoverCard>

                    <AlertDialog>
                      <AlertDialogTrigger>
                        <MdDelete size={20} color="red" />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action will permanently delete this product and
                            remove its data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction>
                            <Button
                              onClick={() => handleDeleteProduct(product.id)}
                              variant="destructive"
                            >
                              Confirm
                            </Button>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
                <TableCell>
                  {product.isPublished ? (
                    <HoverCard>
                      <HoverCardTrigger>
                        <MdOutlinePublishedWithChanges size={20} color="blue" />
                      </HoverCardTrigger>
                      <HoverCardContent>Published</HoverCardContent>
                    </HoverCard>
                  ) : (
                    <HoverCard>
                      <HoverCardTrigger>
                        <MdOutlineUnpublished size={20} color="gray" />
                      </HoverCardTrigger>
                      <HoverCardContent>Unpublished</HoverCardContent>
                    </HoverCard>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Button
        className="fixed right-5 sm:right-10 bottom-10"
        onClick={() => navigate("/admin/products/create")}
      >
        <IoMdAdd /> <span className="hidden sm:inline">Add Product</span>
      </Button>
    </main>
  );
};

export default ProductsPage;
