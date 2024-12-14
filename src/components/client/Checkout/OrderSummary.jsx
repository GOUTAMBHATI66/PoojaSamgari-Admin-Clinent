import { Card, CardTitle } from "@/components/ui/card";

const OrderSummary = ({ products, status, authUser }) => {
  const totalItems = products.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = products.reduce((total, item) => {
    const discountedPrice =
      item.price - (item.price * item.discountPercent) / 100;
    return total + discountedPrice * item.quantity;
  }, 0);

  return (
    <Card className="p-6 max-w-4xl w-full bg-secondary shadow-lg rounded-lg border border-gray-200">
      <CardTitle className="text-2xl font-bold text-gray-800 border-b pb-4 mb-4">
        Order Summary
      </CardTitle>

      {status === "loading" ? (
        <div className="flex items-center justify-center h-32">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((item) => {
            const discountedPrice =
              item.price - (item.price * item.discountPercent) / 100;

            return (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 border-b py-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      item.image ||
                      "https://via.placeholder.com/100x100/cccccc/FFFFFF?text=image"
                    }
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg shadow-md"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {item.description}
                    </p>
                    <p className="text-gray-700 font-semibold">
                      ₹{discountedPrice.toFixed(2)}{" "}
                      <span className="text-gray-500 line-through text-sm">
                        ₹{item.price.toFixed(2)}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="text-gray-800 font-medium text-lg">
                  ₹{(discountedPrice * item.quantity).toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 space-y-4 bg-gray-50 p-4 rounded-lg shadow-inner">
        <div className="flex justify-between text-gray-800 text-lg font-medium">
          <span>Total Items:</span>
          <span>{totalItems}</span>
        </div>
        <div className="flex justify-between text-gray-800 text-lg font-medium">
          <span>Total Price:</span>
          <span>₹{totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-inner">
        <h4 className="font-semibold text-gray-800 mb-2">Shipping Address:</h4>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Street:</span> {authUser.street}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">City:</span> {authUser.city}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">State:</span> {authUser.state}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Postal Code:</span>{" "}
          {authUser.postalCode}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Country:</span> {authUser.country}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Phone:</span> {authUser.phonenumber}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Email:</span> {authUser.email}
        </p>
      </div>
    </Card>
  );
};

export default OrderSummary;
