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
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Link } from "react-router-dom";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deliveryStatuses, setDeliveryStatuses] = useState({});
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
      if (!data.success)
        throw new Error(data.message || "Failed to fetch orders.");
      setOrders(data.data);
      setTotalPages(data.pagination.totalPages || 0);

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

  // const handleStatusChange = async (orderId, newStatus) => {
  //   try {
  //     setDeliveryStatuses((prevStatuses) => ({
  //       ...prevStatuses,
  //       [orderId]: newStatus,
  //     }));
  //     const { data } = await AxiosBase.put(
  //       `/api/admin/order/update/${orderId}`,
  //       { status: newStatus }
  //     );
  //     if (!data.success)
  //       throw new Error(data.message || "Failed to update status.");
  //     toast.success("Status updated successfully");
  //   } catch (error) {
  //     console.error(error.message);
  //     toast.error("Failed to update delivery status");
  //   }
  // };

  // const handlePageChange = (newPage) => {
  //   console.log(page, "sldjflsjdf");
  //   setPage(newPage);
  // };

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
              {orders.map((order, index) => {
                const newdate = formatDate(order.createdAt);

                return (
                  <TableRow key={order.id}>
                    <TableCell>{(page - 1) * size + index + 1}</TableCell>
                    <TableCell>
                      <Link to={`/admin/orders/${order.id}`}>
                      {order.user?.name || "N/A"}
                      </Link>

                    </TableCell>
                    <TableCell>&#8377;{order.totalAmount.toFixed(2)}</TableCell>
                    <TableCell>{order.paymentMethod}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.deliveryStatus}</TableCell>
                    <TableCell>{newdate}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <div className="flex space-x-5 items-center mt-4">
            <Button
              size="sm"
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
            >
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
            </Button>
          </div>
        </>
      )}
    </main>
  );
};

export default OrderPage;
