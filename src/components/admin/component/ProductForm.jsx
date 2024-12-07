import { useState } from "react";
import AxiosBase from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import ImageUpload from "./ImageUpload";
import toast from "react-hot-toast";

export default function ProductForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [productData, setProductData] = useState({
    name: "",
    price: 0,
    description: "",
    imageUrl: null,
    stock: "",
    category: "",
    discountPercent: 0,
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
      navigate(`?step=${step + 1}`);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      navigate(`?step=${step - 1}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handlePublish = async () => {
    try {
      const { data } = await AxiosBase.post(
        "/api/admin/product/create",
        productData
      );
      if (!data.success) throw new Error();
      toast.success(data.message || "Product created successfu  lly");
      setProductData({
        name: "",
        price: "",
        description: "",
        imageUrl: null,
        stock: "",
        discountPercent: "",
        category: "",
      });
      setStep(1);
      navigate("?step=1");
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(
          error.response.data.message || "An error occurred. Please try again."
        );
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Step 1: Product Details
          </h2>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="w-full p-3 border rounded mb-4"
          />
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="w-full p-3 border rounded mb-4"
          />
          <span>Discount Percent is optional</span>
          <input
            type="number"
            name="discountPercent"
            value={productData.discountPercent}
            onChange={handleInputChange}
            placeholder="Discount Percent"
            className="w-full p-3 border rounded mb-4"
          />
          <textarea
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full p-3 border rounded mb-4"
          ></textarea>
          <div className="flex justify-between">
            <button className="bg-gray-300 px-4 py-2 rounded" disabled>
              Back
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Step 2: Product imageUrl and Stock
          </h2>
          <ImageUpload
            onAddImage={(img) =>
              setProductData({ ...productData, imageUrl: img })
            }
          />
          <label htmlFor="stock">
            {" "}
            Add a Stock
            <input
              id="stock"
              type="number"
              name="stock"
              value={productData.stock}
              onChange={handleInputChange}
              placeholder="N0. of Stock"
              className="w-full p-3 border rounded mb-4"
            />
          </label>
          <label htmlFor="category">
            {" "}
            Add a Category
            <input
              id="category"
              name="category"
              value={productData.category}
              onChange={handleInputChange}
              placeholder="N0. of Stock"
              className="w-full p-3 border rounded mb-4"
            />
          </label>
          <div className="flex justify-between">
            <button
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={handleBack}
            >
              Back
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Step 3: Preview and Publish
          </h2>
          <div className="p-4 border rounded mb-4">
            <h3 className="text-lg font-bold">Name:{productData.name}</h3>
            <p>Price: ${productData.price}</p>
            <p>{productData.description}</p>
            {productData.imageUrl && (
              <img
                src={productData.imageUrl}
                alt="Product Preview"
                className="w-full h-48 object-cover my-4"
              />
            )}
            <p>Total Stock: {productData.stock}</p>
          </div>
          <div className="flex justify-between">
            <button
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={handleBack}
            >
              Back
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handlePublish}
            >
              Publish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
