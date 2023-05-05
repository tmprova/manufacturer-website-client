import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    setCardError(error?.message || "");
    setSuccess("");
    // setCardError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-sm btn-success mt-2"
        type="submit"
        // disabled={!stripe || !clientSecret || success}
        disabled={!stripe}
      >
        Pay
      </button>
      {cardError && (
        <span className="text-red-500 block text-sm">{cardError}</span>
      )}
      {success && (
        <div>
          <p className="text-green-500">{success}</p>
          <p>
            Your Transaction Id:{" "}
            <span className="font-bold">{transactionId}</span>{" "}
          </p>
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
