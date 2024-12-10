import UserForm from "./profile/userForm";

const CheckoutPage = () => {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 container">
      <div>Checkout</div>
      <UserForm />
    </main>
  );
};

export default CheckoutPage;
