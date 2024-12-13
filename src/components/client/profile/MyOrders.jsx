import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";
import { useAuth } from "@/components/context/AuthContext";
import AxiosBase from "@/lib/axios";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { authUser } = useAuth();

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

  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "OUT_FOR_DELIVERY":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">My Orders</h1>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Delivered</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <OrderList
            orders={orders}
            isLoading={isLoading}
            getStatusColor={getStatusColor}
          />
        </TabsContent>
        <TabsContent value="pending">
          <OrderList
            orders={orders.filter(
              (order) => order.deliveryStatus !== "DELIVERED"
            )}
            isLoading={isLoading}
            getStatusColor={getStatusColor}
          />
        </TabsContent>
        <TabsContent value="completed">
          <OrderList
            orders={orders.filter(
              (order) => order.deliveryStatus === "DELIVERED"
            )}
            isLoading={isLoading}
            getStatusColor={getStatusColor}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function OrderList({ orders, isLoading, getStatusColor }) {
  if (isLoading) {
    return <OrderSkeleton />;
  }

  if (orders.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No orders found.</p>;
  }

  return (
    <section>
      <p className="text-muted-foreground text-sm ">Total {orders.length}</p>
      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id} className="w-full">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Order #{order.id}</span>
                <Badge className={getStatusColor(order.deliveryStatus)}>
                  {order.deliveryStatus}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div>
                    <p className="text-sm font-medium">Date Placed</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Total Amount</p>
                    <p className="text-sm text-gray-500">
                      ₹{order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Payment Method</p>
                    <p className="text-sm text-gray-500">
                      {order.paymentMethod}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <p className="text-sm text-gray-500">{order.status}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Order Items</h4>
                  <div className="grid gap-4">
                    {order.orderItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4"
                      >
                        <div className="relative h-16 w-16 overflow-hidden rounded">
                          <img
                            src={
                              item.product.imageUrl ||
                              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLhnhmcS5dy1pOq9OA6HOI4_jvpc0zKa_4xA&s"
                            }
                            alt={item.product.name}
                            className="object-cover"
                            width={64}
                            height={64}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {item.product.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="text-sm font-medium">
                          ₹{item.price.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function OrderSkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, index) => (
        <Card key={index} className="w-full">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-5 w-[80px]" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-4 w-[100px] mb-2" />
                    <Skeleton className="h-4 w-[80px]" />
                  </div>
                ))}
              </div>
              <div>
                <Skeleton className="h-4 w-[100px] mb-2" />
                <div className="space-y-4">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-16 w-16 rounded" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-[200px] mb-2" />
                        <Skeleton className="h-4 w-[100px]" />
                      </div>
                      <Skeleton className="h-4 w-[80px]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
