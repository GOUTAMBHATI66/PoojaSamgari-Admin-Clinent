import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import AxiosBase from "@/lib/axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { FaLeftLong, FaRightLong } from "react-icons/fa6";

const OrderPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch orders with pagination
  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const { data } = await AxiosBase.get("/api/admin/orders", {
        params: { page, size },
      });
      if (!data.success) throw new Error();
      setOrders(data.data);
      setTotalPages(data.pagination.totalPages || 0);
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to fetch orders");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetchOrders();
  }, [page, size]);

  return (
    <main className="h-full">
      <h2 className="text-primary bg-secondary  font-semibold text-xl mb-2 text-center py-1 rounded-sm">
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
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S.No</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Payment Type</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Delivery Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow key={order.id}>
                  <TableCell>{(page - 1) * size + index + 1}</TableCell>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.user?.name || "N/A"}</TableCell>
                  <TableCell className="capitalize">
                    <p>
                      {order.shippingAddress?.street},{" "}
                      {order.shippingAddress?.city},{" "}
                      {order.shippingAddress?.state},{" "}
                      {order.shippingAddress?.postalCode},{" "}
                      {order.shippingAddress?.country}
                    </p>
                  </TableCell>
                  <TableCell className="capitalize">
                    <p>+{order.shippingAddress?.phonenumber}</p>
                    {order.shippingAddress?.email}
                  </TableCell>
                  <TableCell>&#8377;{order.totalAmount?.toFixed(2)}</TableCell>

                  <TableCell>
                    {order.orderItems?.map((item) => (
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
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>{deliveryStatuses[order.id]}</TableCell>
                  <TableCell>
                    <Select
                      value={order.deliveryStatus}
                      onValueChange={(newStatus) =>
                        handleStatusChange(order.id, newStatus)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="SHIPPED">Shipped</SelectItem>
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

          <div className="flex space-x-5 justify-between items-center mt-4">
            <Button
              size="sm"
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
            >
              <FaLeftLong />
              Previous
            </Button>
            <p>
              Page {page} of {totalPages}
            </p>
            <Button
              size="sm"
              disabled={page === totalPages}
              onClick={() => handlePageChange(page + 1)}
            >
              Next
              <FaRightLong />
            </Button>
          </div>
        </>
      )}
    </main>
  );
};

export default OrderPage;
