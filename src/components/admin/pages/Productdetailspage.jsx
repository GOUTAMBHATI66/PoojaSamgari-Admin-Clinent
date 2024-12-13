import React, { useState } from 'react';
import { FaUser, FaShippingFast, FaBox, FaDollarSign, FaClock, FaCheckCircle, FaTruck, FaBan } from 'react-icons/fa';

const orderData = {
  id: "675c80f783a4d3414b3967c4",
  paymentMethod: "COD",
  status: "PENDING",
  totalAmount: 1696.6,
  deliveryStatus: "PENDING",
  createdAt: "2024-12-13T18:46:15.488Z",
  user: {
    name: "Goutam Bhati",
    email: "goutambhati183@gmail.com"
  },
  shippingAddress: {
    street: "Krishna Colony, Lata Circle , Jhotwara",
    city: "Jaipur",
    state: "Rajasthan",
    postalCode: "302012",
    country: "India",
    phonenumber: "911111111111"
  },
  orderItems: [
    {
      quantity: 1,
      price: 499,
      product: {
        name: "Pink T-shirt",
        price: 499,
        discountPrice: 0,
        imageUrl: "http://localhost:4000/uploads/1733851906555-635407319-pink image.jpeg"
      }
    },
    {
      quantity: 3,
      price: 399.2,
      product: {
        name: "Blue Dress with MorPankh",
        price: 499,
        discountPrice: 399.2,
        imageUrl: "http://localhost:4000/uploads/1733851828868-346417876-LadduGopalDress.jpeg"
      }
    }
  ]
};

const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'PROCESSING': return 'bg-blue-100 text-blue-800';
      case 'SHIPPED': return 'bg-indigo-100 text-indigo-800';
      case 'DELIVERED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(status)}`}>
      {status}
    </span>
  );
};

const Productdetailspage = () => {
  const [orderStatus, setOrderStatus] = useState(orderData.status);

  const handleStatusChange = (e) => {
    setOrderStatus(e.target.value);
    // Here you would typically make an API call to update the status
    console.log(`Order status updated to: ${e.target.value}`);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PENDING': return <FaClock className="text-yellow-500" />;
      case 'PROCESSING': return <FaCheckCircle className="text-blue-500" />;
      case 'SHIPPED': return <FaTruck className="text-indigo-500" />;
      case 'DELIVERED': return <FaCheckCircle className="text-green-500" />;
      case 'CANCELLED': return <FaBan className="text-red-500" />;
      default: return <FaClock className="text-gray-500" />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-purple-500 to-indigo-600">
            <h1 className="text-3xl font-bold text-white">Order Details</h1>
            <p className="text-purple-100">Order ID: {orderData.id}</p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Order Summary */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                  <FaDollarSign className="mr-2 text-purple-500" /> Order Summary
                </h2>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-semibold">${orderData.totalAmount.toFixed(2)}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-semibold">{orderData.paymentMethod}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Order Date:</span>
                    <span className="font-semibold">{new Date(orderData.createdAt).toLocaleDateString()}</span>
                  </p>
                </div>
              </div>

              {/* Customer Details */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                  <FaUser className="mr-2 text-purple-500" /> Customer Details
                </h2>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-semibold">{orderData.user.name}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-semibold">{orderData.user.email}</span>
                  </p>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                  <FaShippingFast className="mr-2 text-purple-500" /> Shipping Address
                </h2>
                <div className="space-y-1">
                  <p className="text-gray-800">{orderData.shippingAddress.street}</p>
                  <p className="text-gray-800">
                    {orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.postalCode}
                  </p>
                  <p className="text-gray-800">{orderData.shippingAddress.country}</p>
                  <p className="text-gray-800">
                    <span className="font-semibold">Phone:</span> {orderData.shippingAddress.phonenumber}
                  </p>
                </div>
              </div>

              {/* Order Status */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                  <FaClock className="mr-2 text-purple-500" /> Order Status
                </h2>
                <div className="flex items-center space-x-4">
                  {getStatusIcon(orderStatus)}
                  <select
                    value={orderStatus}
                    onChange={handleStatusChange}
                    className="form-select block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="PROCESSING">Processing</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                <FaBox className="mr-2 text-purple-500" /> Order Items
              </h2>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orderData.orderItems.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full object-cover" src={item.product.imageUrl} alt={item.product.name} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{item.product.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.quantity}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${item.price.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${(item.quantity * item.price).toFixed(2)}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productdetailspage;

