import { useSelector } from "react-redux";
import { Button } from "../../ui/button";
import UserForm from "../profile/userForm";
import OrderSummary from "./OrderSummary";
import { Navigate, useNavigate } from "react-router-dom";
import AxiosBase from "@/lib/axios";
import { useAuth } from "@/components/context/AuthContext";
import toast from "react-hot-toast";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { authUser, isLoading } = useAuth();
  const { products, status } = useSelector((state) => state.cartSlice);

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
        paymentMethod: "ONLINE",
      };

      const { data } = await AxiosBase.post(
        "/api/store/order/payment",
        payload
      );
      if (!data.success) throw new Error("Order creation failed");

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
              navigate("/");
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
      };

      // Initialize Razorpay
      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        console.error("Payment Failed:", response);
        toast.error("Payment failed. Please try again.");
      });

      // Open Razorpay Modal
      rzp1.open();
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to initiate payment. Please try again.");
    }
  };

  return (
    <main className="container mx-auto md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center justify-center w-full">
      <OrderSummary products={products} status={status} />

      <div>
        <UserForm />
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