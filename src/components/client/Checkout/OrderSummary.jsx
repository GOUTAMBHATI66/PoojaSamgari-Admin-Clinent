import { Card, CardTitle } from "@/components/ui/card";

const OrderSummary = ({ products, status }) => {
  const totalItems = products.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = products.reduce((total, item) => {
    const discountedPrice =
      item.price - (item.price * item.discountPercent) / 100;
    return total + discountedPrice * item.quantity;
  }, 0);

  return (
    <Card className="relative p-6 max-w-3xl w-full h-full   flex flex-col">
      <CardTitle className="text-xl font-bold text-gray-800 border-b pb-2">
        Order Summary
      </CardTitle>

      {status === "loading" ? (
        <p>Loading...</p>
      ) : (
        <div className="flex-grow   h-full">
          <div className="space-y-2">
            {products.map((item) => {
              const discountedPrice =
                item.price - (item.price * item.discountPercent) / 100;

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b py-3"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        item.image ||
                        "https://via.placeholder.com/100x100/cccccc/FFFFFF?text=image"
                      }
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium text-gray-800 text-sm">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-1">
                        {item.description}
                      </p>
                      <p className="text-sm font-semibold text-gray-800">
                        ₹{discountedPrice.toFixed(2)}{" "}
                        <span className="text-xs text-gray-500 line-through">
                          ₹{item.price.toFixed(2)}
                        </span>
                      </p>
                      <p className="text-xs text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-gray-800">
                    ₹{(discountedPrice * item.quantity).toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="absolute bottom-2 left-1 right-1  bg-background  rounded-lg  px-6 py-4">
        <div className="flex justify-between text-lg font-semibold text-gray-800">
          <span>Total Items:</span>
          <span>{totalItems}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold text-gray-800">
          <span>Total Price:</span>
          <span>₹{totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </Card>
  );
};

export default OrderSummary;
