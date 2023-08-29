import { useState } from "react";
import axios from "axios";

const ProductForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userData = {
    phone: 123,
    email: null,
    order_note: "",
    status: "New",
    payment_due: true,
    order_total: 10.0,
    supplier: 51,
  };

  const cart = [
    {
      quantity: 50,
      product_price: 50,
      order: 9,
      product: 7,
    },
    {
      quantity: 10,
      product_price: 70,
      order: 9,
      product: 8,
    },
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://192.168.3.16:8000/supplier/supplier-order/create/",
        userData
      );
      console.log(response);

      const generatedId = response.data.insertedId;
      const updatedCart = cart.map((item) => {
        return {
          ...item,
          userGeneratedId: generatedId,
        };
      });

      for (const item of updatedCart) {
        await axios.post(
          "http://192.168.3.16:8000/supplier/supplier-order-product/create/",
          item
        );
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
