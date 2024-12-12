import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../ui/button";
import OrderSummary from "./OrderSummary";
import { Navigate, useNavigate } from "react-router-dom";
import AxiosBase from "@/lib/axios";
import { useAuth } from "@/components/context/AuthContext";
import toast from "react-hot-toast";
import { useState } from "react";
import { clearCart } from "@/features/cartSlice";

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
        dispatch(clearCart());
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
              dispatch(clearCart());
              navigate("/profile");
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
          ondismiss: async function (response) {
            console.warn("Payment modal closed by user");
            toast.error("Payment was not completed. Deleting order...");
            try {
              await AxiosBase.delete(
                `/api/store/order/delete/${data.order.id}`
              );
              toast.success("Order deleted successfully.");
            } catch (error) {
              console.error("Failed to delete the order:", error);
              toast.error(
                "Failed to clean up the order. Please contact support."
              );
            }
          },
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", async function (response) {
        console.error("Payment Failed:", response);
        toast.error("Payment failed. Please try again.");
        try {
          await AxiosBase.delete(`/api/store/order/delete/${data.order.id}`);
          toast.success("Order deleted successfully.");
        } catch (error) {
          console.error("Failed to delete the order:", error);
          toast.error("Failed to clean up the order. Please contact support.");
        }
      });

      rzp1.open();
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to initiate payment. Please try again.");
    }
  };

  return (
    <main className="container mx-auto md:p-6 flex flex-col gap-8 items-center justify-center w-full">
      <OrderSummary products={products} status={status} />

      <div>
        <div className="mt-4">
          <label className="block">
            <input
              type="radio"
              name="paymentMethod"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={() => setPaymentMethod("COD")}
            />
            Cash on Delivery
          </label>
          <label className="block">
            <input
              type="radio"
              name="paymentMethod"
              value="ONLINE"
              checked={paymentMethod === "ONLINE"}
              onChange={() => setPaymentMethod("ONLINE")}
            />
            Online Payment
          </label>
        </div>
        <Button
          onClick={handleCheckout}
          disabled={products.length === 0}
          className="mt-6 bg-blue-700 hover:bg-blue-500 text-white font-medium rounded-lg py-3 w-full transition-all"
        >
          Pay
        </Button>
      </div>
    </main>
  );
};

export default CheckoutPage;
