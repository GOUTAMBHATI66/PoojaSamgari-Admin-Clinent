import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
  const navigate = useNavigate();
  return (
    <main>
      <Button size="lg" onClick={() => navigate("/admin/products/create")}>
        Create Product
      </Button>
      <section>dispaly all prducts here.</section>
    </main>
  );
};

export default ProductsPage;
