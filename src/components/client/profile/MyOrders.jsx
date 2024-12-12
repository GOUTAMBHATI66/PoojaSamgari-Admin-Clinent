import { useAuth } from "@/components/context/AuthContext";
import { Card } from "@/components/ui/card";
import AxiosBase from "@/lib/axios";
import React, { useEffect, useState } from "react";

const MyOrders = () => {
  const { authUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("PENDING");

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const { data } = await AxiosBase.get(`/api/store/user/${authUser.id}`);
      if (!data.success) {
        throw new Error("Invalid API response");
      }
      setOrders(data.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter orders based on the active tab
  const filteredOrders = orders.filter((order) =>
    activeTab === "COMPLETED"
      ? order.deliveryStatus === "COMPLETED"
      : order.deliveryStatus !== "COMPLETED"
  );

  return (
    <section className="p-6 w-full border border-black/10 shadow-md h-screen">
      <h2 className="text-2xl font-semibold text-center text-[#EA580C] mb-4 pb-4 border-b border-black/10">
        My Orders
      </h2>

      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setActiveTab("PENDING")}
          className={`px-6 py-2 rounded-l-md ${
            activeTab === "PENDING"
              ? "bg-[#EA580C] text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Pending/Other Orders
        </button>
        <button
          onClick={() => setActiveTab("COMPLETED")}
          className={`px-6 py-2 rounded-r-md ${
            activeTab === "COMPLETED"
              ? "bg-[#EA580C] text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Completed Orders
        </button>
      </div>

      {/* Order List */}
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="p-4 border rounded-md shadow-sm bg-gray-50"
            >
              <h3 className="font-semibold">Order ID: {order.id}</h3>
              <p>Total Amount: ₹{order.totalAmount}</p>
              <p>Payment Method: {order.paymentMethod}</p>
              <p>Delivery Status: {order.deliveryStatus}</p>
              <p>Ordered At: {new Date(order.createdAt).toLocaleString()}</p>

              <h4 className="font-semibold mt-2">Items:</h4>
              <ul className="space-y-3">
                {order.orderItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-4 border-b pb-2"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h5 className="font-semibold">{item.product.name}</h5>
                      <p>Category: {item.product.category}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ₹{item.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No orders found for this category.</p>
      )}
    </section>
  );
};

export default MyOrders;
