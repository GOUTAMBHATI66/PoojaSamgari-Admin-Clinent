import AxiosBase from "@/lib/axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const product = async () => {
    try {
      setIsLoading(true);
      const { data } = await AxiosBase.get(`api/admin/product/${id}`);
      if (!data.success) throw new Error();
      console.log(data);
      setProducts(data.data);
    } catch (error) {
      console.log(error.message);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    product();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-white rounded shadow">
      <h3 className="text-2xl font-bold mb-6">Edit Product Details</h3>
      <form>
        {/* First Section: Product Name and Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="productName"
              className="block text-base font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              value={product.category}
              placeholder="Enter product name"
              className="mt-1 block w-full px-2 py-1  outline-none rounded-sm border border-gray-700 shadow-sm  text-base"
            />
          </div>
          <div>
            <label
              htmlFor="productPrice"
              className="block text-base font-medium text-gray-700"
            >
              Product Price
            </label>
            <input
              type="number"
              id="productPrice"
              placeholder="Enter product price"
              className="mt-1 block w-full px-2 py-1  outline-none rounded-sm border border-gray-700 shadow-sm  text-base"
            />
          </div>
        </div>

        {/* Second Section: Stock and Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="stockQuantity"
              className="block text-base font-medium text-gray-700"
            >
              Stock Quantity
            </label>
            <input
              type="number"
              id="stockQuantity"
              placeholder="Enter stock quantity"
              className="mt-1 block w-full px-2 py-1  outline-none rounded-sm border border-gray-700 shadow-sm  text-base"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-base font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              className="mt-1 block w-full px-2 py-1  outline-none rounded-sm border border-gray-700 shadow-sm  text-base"
            >
              <option value="">Select category</option>
              <option value="tshirts">T-Shirts</option>
              <option value="hoodies">Hoodies</option>
              <option value="pants">Pants</option>
            </select>
          </div>
        </div>

        {/* Third Section: Description */}
        <div className="mb-6">
          <label
            htmlFor="productDescription"
            className="block text-base font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="productDescription"
            rows="4"
            placeholder="Enter product description"
            className="mt-1 block w-full px-2 py-1  outline-none rounded-sm border border-gray-700 shadow-sm  text-base"
          ></textarea>
        </div>

        {/* Third Section: Stock and Category */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="stockQuantity" className="block text-base font-medium text-gray-700">
              Stock Quantity
            </label>
            <input
              type="number"
              id="stockQuantity"
              placeholder="Enter stock quantity"
              className="mt-1 block w-full px-2 py-1  outline-none rounded-sm border border-gray-700 shadow-sm  text-base"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-base font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              className="mt-1 block w-full px-2 py-1  outline-none rounded-sm border border-gray-700 shadow-sm  text-base"
            >
              <option value="">Select category</option>
              <option value="tshirts">T-Shirts</option>
              <option value="hoodies">Hoodies</option>
              <option value="pants">Pants</option>
            </select>
          </div>
        </div> */}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full md:w-auto bg-indigo-600 text-white px-6 py-2 rounded-md shadow hover:bg-indigo-700"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
