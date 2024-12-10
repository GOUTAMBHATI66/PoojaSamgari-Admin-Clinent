// Import necessary modules
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AxiosBase from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { X } from "lucide-react";
import ImageUpload from "../component/ImageUpload";
import toast from "react-hot-toast";

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [singleProduct, setSingleProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialProduct, setInitialProduct] = useState(null);

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const { data } = await AxiosBase.get(`api/admin/product/${id}`);
      if (!data.success) throw new Error("Failed to fetch product data");

      setSingleProduct(data.data);
      setInitialProduct(data.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSingleProduct((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!singleProduct) return;
    try {
      setIsSubmitting(true);
      const { data } = await AxiosBase.post(
        `/api/admin/product/update/${id}`,
        singleProduct
      );
      if (!data.success) throw new Error("Failed to update product");
      toast.success(data.message || "Product updated successfully")

      navigate("/admin/products");
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveImage = async (e) => {
    e.preventDefault();
    if (!singleProduct) return;
    try {
      const { data } = await AxiosBase.post(`/api/image/deleteimage`, {
        imageToRemove: singleProduct.imageUrl,
        productId: singleProduct?.id,
      });
    } catch (error) {
      console.error(error.message);
    } finally {
      setSingleProduct({ ...singleProduct, imageUrl: "" });
    }
  };

  const renderSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[...Array(5)].map((_, idx) => (
        <Skeleton key={idx} className="h-10 w-full" />
      ))}
      <Skeleton className="h-24 w-full" />
    </div>
  );

  const isFormValid =
    singleProduct && Object.values(singleProduct).every((value) => value);

  const isFormChanged =
    JSON.stringify(singleProduct) !== JSON.stringify(initialProduct);

  return (
    <div className="container mx-auto p-6  rounded shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold ">Edit Product Details</h3>
        <Button
          disabled={!isFormChanged || !isFormValid || isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Updating..." : "Update"}
        </Button>
      </div>

      {isLoading ? (
        renderSkeleton()
      ) : (
        <section>
          {/* Product Name and Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="name"
                className="block text-base font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                type="text"
                id="name"
                value={singleProduct.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                className="mt-1 block w-full px-2 py-1 outline-none rounded-sm border border-gray-700 shadow-sm text-base"
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-base font-medium text-gray-700"
              >
                Product Price
              </label>
              <input
                type="number"
                id="price"
                value={singleProduct.price}
                onChange={handleInputChange}
                placeholder="Enter product price"
                className="mt-1 block w-full px-2 py-1 outline-none rounded-sm border border-gray-700 shadow-sm text-base"
              />
            </div>
          </div>

          {/* Stock and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="stock"
                className="block text-base font-medium text-gray-700"
              >
                Stock Quantity
              </label>
              <input
                type="number"
                id="stock"
                value={singleProduct.stock}
                onChange={handleInputChange}
                placeholder="Enter stock quantity"
                className="mt-1 block w-full px-2 py-1 outline-none rounded-sm border border-gray-700 shadow-sm text-base"
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-base font-medium text-gray-700"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                value={singleProduct.category}
                onChange={handleInputChange}
                placeholder="Enter a category"
                className="mt-1 block w-full px-2 py-1 outline-none rounded-sm border border-gray-700 shadow-sm text-base"
              />
            </div>
          </div>

          {/* Discount Percent */}
          <div className="mb-6">
            <label
              htmlFor="discountPercent"
              className="block text-base font-medium text-gray-700"
            >
              Discount Percent
            </label>
            <input
              type="number"
              id="discountPercent"
              value={singleProduct.discountPercent}
              onChange={handleInputChange}
              placeholder="Enter discount percent"
              className="mt-1 block w-full px-2 py-1 outline-none rounded-sm border border-gray-700 shadow-sm text-base"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-base font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              value={singleProduct.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
              className="mt-1 block w-full px-2 py-1 outline-none rounded-sm border border-gray-700 shadow-sm text-base"
            ></textarea>
          </div>

          {/* image */}
          {singleProduct.imageUrl !== "" ? (
            <div className="w-1/2  relative h-full">
              <img
                src={singleProduct.imageUrl}
                alt="Product Image"
                className="object-fill  rounded-lg w-full h-full aspect-square"
              />
              <X
                size={30}
                onClick={handleRemoveImage}
                className="p-0.5 absolute top-2 right-2 rounded-full bg-secondary cursor-pointer"
              />
            </div>
          ) : (
            <ImageUpload
              onAddImage={(img) =>
                setSingleProduct({ ...singleProduct, imageUrl: img })
              }
            />
          )}
        </section>
      )}
    </div>
  );
}

export default EditProduct;
