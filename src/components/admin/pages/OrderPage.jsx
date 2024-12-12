import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import AxiosBase from "@/lib/axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deliveryStatuses, setDeliveryStatuses] = useState({});

  // Fetch orders with items
  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const { data } = await AxiosBase.get("/api/admin/orders");
      if (!data.success)
        throw new Error(data.message || "Failed to fetch orders.");
      setOrders(data.data);
      console.log(data);
      const statuses = data.data.reduce((acc, order) => {
        acc[order.id] = order.status;
        return acc;
      }, {});
      setDeliveryStatuses(statuses);
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to fetch orders");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setDeliveryStatuses((prevStatuses) => ({
        ...prevStatuses,
        [orderId]: newStatus,
      }));

      // Send updated status to the server
      const { data } = await AxiosBase.put(
        `/api/admin/orders/${orderId}/status`,
        {
          status: newStatus,
        }
      );

      if (!data.success)
        throw new Error(data.message || "Failed to update status.");
      toast.success("Status updated successfully");
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to update delivery status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <main>
      <h2 className="text-black bg-secondary font-bold text-2xl mb-4 text-center py-2 rounded-sm">
        All Orders
      </h2>

      {isLoading &&
        [...Array(4)].map((_, idx) => (
          <Skeleton key={idx} className="h-10 my-2 rounded-lg w-full" />
        ))}

      {!isLoading && orders.length === 0 && (
        <p className="text-center text-2xl font-bold">
          Currently, there are no orders.
        </p>
      )}

      {orders.length > 0 && !isLoading && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Shipping Address</TableHead>
              <TableHead>Order Contact</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Order Items</TableHead>
              <TableHead>Payment Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Update Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={order.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.user?.name || "N/A"}</TableCell>
                <TableCell className="capitalize">
                  {order.shippingAddress?.street}, {order.shippingAddress?.city}
                  , {order.shippingAddress?.state},{" "}
                  {order.shippingAddress?.postalCode},{" "}
                  {order.shippingAddress?.country}
                </TableCell>
                <TableCell className="capitalize">
                  <p>+{order.shippingAddress.phonenumber}</p>
                  {order.shippingAddress.email}
                </TableCell>
                <TableCell>&#8377;{order.totalAmount.toFixed(2)}</TableCell>
                <TableCell>{order.paymentMethod}</TableCell>
                <TableCell>
                  {order.orderItems.map((item) => (
                    <div key={item.id} className="mb-2">
                      <span className="font-medium">
                        {item.product?.name || "Unknown Product"}
                      </span>
                      <span className="ml-2 text-gray-500">
                        x{item.quantity}
                      </span>
                    </div>
                  ))}
                </TableCell>
                <TableCell>{deliveryStatuses[order.id]}</TableCell>
                <TableCell>
                  <Select
                    value={deliveryStatuses[order.id]}
                    onValueChange={(newStatus) =>
                      handleStatusChange(order.id, newStatus)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem
                        value="  SHIPPED
"
                      >
                        Shipped
                      </SelectItem>
                      <SelectItem value="OUT_FOR_DELIVERY">
                        Out for Delivery
                      </SelectItem>
                      <SelectItem value="DELIVERED">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </main>
  );
};

export default OrderPage;
