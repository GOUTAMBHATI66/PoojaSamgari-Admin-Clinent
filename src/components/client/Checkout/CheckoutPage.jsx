import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../ui/button";
import OrderSummary from "./OrderSummary";
import { Navigate, useNavigate } from "react-router-dom";
import AxiosBase from "@/lib/axios";
import { useAuth } from "@/components/context/AuthContext";
import toast from "react-hot-toast";
import { useState } from "react";
import { clearCart } from "@/features/cartSlice";
import { FaLeftLong } from "react-icons/fa6";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { authUser, isLoading } = useAuth();
  const { products, status } = useSelector((state) => state.cartSlice);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const dispatch = useDispatch();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (products.length === 0 || !authUser) {
    return <Navigate to="/" />;
  }

  const handleCheckout = async () => {
    try {
      const payload = {
        userId: authUser.id,
        items: products.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        paymentMethod: paymentMethod,
      };

      const { data } = await AxiosBase.post(
        "/api/store/order/payment",
        payload
      );
      if (!data.success) throw new Error("Order creation failed");
      if (paymentMethod === "COD" && data.success) {
        toast.success("Order placed successfully");
        navigate("/profile");
        setTimeout(() => {
          dispatch(clearCart());
        }, 1000);
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        order_id: data.order.razorpayOrderId,
        amount: Math.round(data.order.totalAmount * 100),
        currency: "INR",
        name: "Shree",
        description: "Place order for good products",
        image: "https://example.com/your_logo",
        handler: async function (response) {
          const verifyPayload = {
            orderId: data.order.id,
            ...response,
          };

          try {
            const { data: verifyResponse } = await AxiosBase.post(
              "/api/store/order/payment/verify",
              verifyPayload
            );
            if (verifyResponse.success) {
              toast.success("Payment Successful!");
              navigate("/profile");
              setTimeout(() => {
                dispatch(clearCart());
              }, 1000);
            } else {
              throw new Error("Payment verification failed");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error("Payment verification failed.");
          }
        },
        prefill: {
          name: authUser.name,
          email: authUser.email,
          contact: authUser.phoneNumber,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
        method: {
          upi: true,
          netbanking: true,
          card: true,
          wallet: true,
        },
        modal: {
          ondismiss: async function () {
            try {
              console.log("Payment modal closed by user");
              const { data: res } = await AxiosBase.delete(
                `/api/store/order/payment/delete/${data.order.id}`
              );
              if (res.success) {
                toast.info(
                  "Payment modal closed. Your order has been canceled."
                );
              }
            } catch (error) {
              console.error("Failed to delete the order:", error);
            }
          },
        },
      };

      const rzp1 = new window.Razorpay(options);

      rzp1.open();
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to initiate payment. Please try again.");
    }
  };

  return (
    <main className="container mx-auto  py-8 md:py-12">
      {/* Header with Back Button and Logo */}
      <header className="flex items-center justify-between border-b  pb-2 sticky top-0 bg-background z-50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-all"
        >
          <FaLeftLong />
          Back
        </button>
        <img src="/logo.png" alt="Company Logo" className="w-10 h-auto" />
      </header>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        {/* Order Summary */}
        <OrderSummary products={products} status={status} authUser={authUser} />

        {/* Payment Section */}
        <section className="p-6 space-y-6 sticky top-20 self-start  border  rounded-lg">
          <h2 className="text-xl font-bold text-gray-800">Payment Details</h2>

          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
                className="h-5 w-5 text-blue-600 focus:ring focus:ring-blue-300"
              />
              <span className="text-gray-700">Cash on Delivery</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="paymentMethod"
                value="ONLINE"
                checked={paymentMethod === "ONLINE"}
                onChange={() => setPaymentMethod("ONLINE")}
                className="h-5 w-5 text-blue-600 focus:ring focus:ring-blue-300"
              />
              <span className="text-gray-700">Online Payment</span>
            </label>
          </div>

          <Button
            onClick={handleCheckout}
            disabled={products.length === 0}
            className="mt-6 bg-blue-600  group overflow-hidden relative hover:font-bold hover:text-lg  text-white font-medium rounded-lg py-3 w-full transition-all"
          >
            &#8377; Pay Now
            <span className="absolute inset-0 bg-blue-800  transition-transform transform translate-x-[-100%] group-hover:translate-x-0 z-[-1]"></span>
          </Button>
        </section>
      </div>
    </main>
  );
};

export default CheckoutPage;
