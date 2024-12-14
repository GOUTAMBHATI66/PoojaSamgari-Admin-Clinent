import { useState } from "react";
import AxiosBase from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import ImageUpload from "./ImageUpload";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { MdArrowBack, MdOutlinePublishedWithChanges } from "react-icons/md";
import { TbArrowLeftFromArc, TbArrowRightFromArc } from "react-icons/tb";
import { ArrowRight } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

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
    let updatedValue = value;

    if (name === "price" || name === "discountPercent") {
      updatedValue = Math.max(1, value);
    }

    setProductData({ ...productData, [name]: updatedValue });
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
      navigate("/admin/products");
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(
          error.response.data.message || "An error occurred. Please try again."
        );
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-secondary shadow-lg rounded-lg">
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Step 1 : Product Details
          </h2>
          <span>Product Name : </span>
          <input
            type="text"
            name="name"
            required
            value={productData.name}
            onChange={handleInputChange}
            placeholder="Add product name..."
            className="w-full p-3 border rounded mt-1 mb-4 outline-none bg-background"
          />

          <span>Product Price : </span>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            placeholder="Price..."
            min="1"
            className="w-full p-3 border rounded mt-1 mb-4 outline-none bg-background"
          />
          <span>
            Discount Percent* (optional)
            <span className="text-xs ml-2 text-muted-foreground">
              In Percent %
            </span>
          </span>
          <input
            type="number"
            name="discountPercent"
            value={productData.discountPercent}
            onChange={handleInputChange}
            placeholder="Add discount Percent"
            className="w-full p-3 border rounded mt-1 mb-4 outline-none bg-background"
          />

          <span>Product Description : </span>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            placeholder="Write description here..."
            className="w-full p-3 border rounded mt-1 mb-4 outline-none bg-background"
          ></textarea>
          <div className="flex justify-end ">
            <HoverCard>
              <HoverCardTrigger>
                <Button
                  variant="outline"
                  disabled={
                    !productData.price ||
                    !productData.name ||
                    !productData.description
                  }
                  onClick={handleNext}
                >
                  Next
                  <ArrowRight />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent>Fill details to next.</HoverCardContent>
            </HoverCard>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Step 2 : Product imageUrl and Stock
          </h2>
          <ImageUpload
            onAddImage={(img) =>
              setProductData({ ...productData, imageUrl: img })
            }
          />
          <label htmlFor="stock">
            Add a Stock
            <input
              id="stock"
              type="number"
              name="stock"
              value={productData.stock}
              onChange={handleInputChange}
              placeholder="N0. of Stock"
              className="w-full p-3 border rounded mt-1 mb-4 outline-none bg-background"
            />
          </label>
          <label htmlFor="category">
            Category Name
            <input
              id="category"
              type="text"
              name="category"
              value={productData.category}
              onChange={handleInputChange}
              placeholder="Add a category"
              className="w-full p-3 border rounded mt-1 mb-4 outline-none bg-background"
            />
          </label>
          <div className="flex justify-between">
            <Button variant="secondary" onClick={handleBack}>
              <MdArrowBack />
              Back
            </Button>
            <HoverCard>
              <HoverCardTrigger>
                <Button
                  variant="outline"
                  disabled={
                    !productData.category | !productData.imageUrl ||
                    !productData.stock
                  }
                  onClick={handleNext}
                >
                  Next
                  <ArrowRight />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent>Fill details to next.</HoverCardContent>
            </HoverCard>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Step 3 : Preview and Publish
          </h2>
          <div className="flex flex-col gap-2 p-4  rounded mb-4">
            <h3 className="text-lg font-bold">
              Name : <span className=" font-">{productData.name}</span>
            </h3>
            <p className="text-lg font-bold">
              Price :{" "}
              <span className=" text-green-600 ">
                &#8377; {productData.price}
              </span>
            </p>
            <p className="text-lg font-bold">
              Category : <span className="">{productData.category}</span>
            </p>
            <p className="text-lg font-bold">
              Discount :{" "}
              <span className=" text-green-600 ">
                {productData.discountPercent} %
              </span>
            </p>
            <p className="text-lg font-bold">
              Discription :{" "}
              <span className="  text-foreground text-sm  font-light ">
                {productData.description}
              </span>
            </p>
            {productData.imageUrl && (
              <img
                src={productData.imageUrl}
                alt="Product Preview"
                className="w-3/4   object-fill rounded-lg my-4"
              />
            )}
            <p className="text-lg font-bold">
              Total Stock : {productData.stock}
            </p>
          </div>
          <div className="flex justify-between">
            <Button variant="secondary" onClick={handleBack}>
              <MdArrowBack />
              Back
            </Button>{" "}
            <Button
              className=" bg-muted-foreground text-white px-4 py-2 rounded"
              onClick={handlePublish}
            >
              Publish
              <MdOutlinePublishedWithChanges />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
