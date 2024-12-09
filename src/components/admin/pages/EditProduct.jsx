import AxiosBase from "@/lib/axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageUpload from "../component/ImageUpload";
import { Button } from "@/components/ui/button";

function EditProduct() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
 

  const [singleProduct, setSingleProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    discountPercent: "",
    description: "",
  });
  
  const product = async () => {
    try {
      setIsLoading(true);
      const { data } = await AxiosBase.get(`api/admin/product/${id}`);
      if (!data.success) throw new Error();
    
      setSingleProduct(data.data);
    } catch (error) {
      console.log(error.message);
      setSingleProduct([]);
    } finally {
      setIsLoading(false);
    }
    
  };

  useEffect(() => {
    product();
  }, []);

 
  const UpdateProduct = async () => {

    try {
      setIsLoading(true);
      const { data } = await AxiosBase.post(`api/admin/product/update/${singleProduct.id}`);
      if (!data.success) throw new Error();
      console.log(data)
    } catch (error) {
      console.log(error.message);
      // setSingleProduct([]);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(singleProduct)

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSingleProduct((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Updated Product Data:", singleProduct);
    
    UpdateProduct()
    navigate("/admin/products")
    }

   // Check if all fields are filled
   const isFormValid = Object.values(singleProduct).every(
    (value) => value !== "" && value !== null
  );

  return (
    <div className="container mx-auto p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold ">Edit Product Details</h3>
        
        <Button disabled={!isFormValid} onClick={handleSubmit} >Update</Button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* First Section: Product Name and Price */}
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
              className="mt-1 block w-full px-2 py-1  outline-none rounded-sm border border-gray-700 shadow-sm  text-base"
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
              className="mt-1 block w-full px-2 py-1  outline-none rounded-sm border border-gray-700 shadow-sm  text-base"
            />
          </div>
        </div>

        {/* Second Section: Stock and Category */}
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
           
            <input
              type="text"
              id="category"
              value={singleProduct.category}
              onChange={handleInputChange}
              placeholder="Enter a category"
              className="mt-1 block w-full px-2 py-1  outline-none rounded-sm border border-gray-700 shadow-sm  text-base"
            />
          </div>
        </div>

       {/*  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* <div>
          <ImageUpload
            onAddImage={() =>
              setProductData({ ...productData, imageUrl: singleProduct.imageUrl })
            }
          />
          </div> */}
          <div>
            <label
              htmlFor="discountPercent"
              className="block text-base font-medium text-gray-700"
            >
              DiscountPercent
            </label>
           
            <input
              type="number"
              id="discountPercent"
              value={singleProduct.discountPercent}
              onChange={handleInputChange}
              placeholder="Enter a discountPercent"
              className="mt-1 block w-full px-2 py-1  outline-none rounded-sm border border-gray-700 shadow-sm  text-base"
            />
          </div>
        </div>

        {/* Third Section: Description */}
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
            className="mt-1 block w-full px-2 py-1  outline-none rounded-sm border border-gray-700 shadow-sm  text-base"
          ></textarea>
        </div>

       
      </form>
    </div>
  );
}

export default EditProduct;

