import { useState } from "react";
import axios from "axios";

const ProductForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const invoiceData = {
    phone: 1733572774,
    email: null,
    order_note: "",
    status: "New",
    payment_due: true,
    order_total: 40,
    supplier: "vsb009",
  };

  const orders = [
    {
      quantity: 100,
      product_price: 150,
      product: 10,
    },
    {
      quantity: 200,
      product_price: 250,
      product: 11,
    },
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/users",
        invoiceData
      );
      console.log(response);

      const generatedId = response.data.data.insertedId;

      const updatedCart = orders.map((item) => {
        return { ...item, orderNo: generatedId };
      });

      for (const item of updatedCart) {
        await axios.post("http://localhost:5000/orders/", item);
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
