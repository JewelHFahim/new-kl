import { useState } from "react";
import axios from "axios";

const ProductForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userData = {
    supplier: "2",
    product_name: "Manogo",
    product_description: "from rajshahi",
    selling_price: 120,
    buying_price: 100,
    stock: 10,
    is_available: true,
  };

  const cart = [
    {
      name: "apple",
      quantity: 5,
      buying_price: 50,
    },
    {
      name: "orange",
      quantity: 6,
      buying_price: 60,
    },
  ];


  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:5000/users", userData);
      console.log(response)

      const generatedId = response.data.insertedId;
      const updatedCart = cart.map((item) => {
        return {
          ...item,
          userGeneratedId: generatedId,
        };
      });

        for (const item of updatedCart) {
          await axios.post("http://localhost:5000/orders", item);
        }

      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Product Form</h1>
      <button onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
};

export default ProductForm;
