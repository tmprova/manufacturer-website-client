import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import auth from "../../firebase/firebase.init";
import { useQuery } from "react-query";
import axiosPrivate from "../../API/axiosPrivate";
import Loading from "../../components/Loading";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// stripe keys
const stripePromise = loadStripe(
  "pk_test_51My5YVGwOg0KGdK5zRKvryBKB5cLaOhKpOn3MebbLpW3O6hI3IHBDw7IutsVSa5eXdq1NgiT7E5WG3mlau3EBwzv00eRfCTiwj"
);

const Payment = () => {
  const { id } = useParams();

  const [user, loading] = useAuthState(auth);

  const { data: product, isLoading } = useQuery(["payment", id], () =>
    axiosPrivate.get(`http://localhost:5000/api/payment/${id}`)
  );

  if (isLoading || loading) return <Loading></Loading>;

  return (
    <div className="card sm:w-96 w-4/5 max-w-md bg-base-100 shadow-xl mt-10">
      <div className="card-body items-center text-center">
        <h1 className="text-center font-bold text-xl underline">
          Order Details
        </h1>
        <h2 className="card-title capitalize">
          Hello{" "}
          <span className="text-accent font-bold">{user.displayName},</span>
        </h2>
        <p>
          Please pay for:{" "}
          <span className="capitalize">{product?.data?.product}</span>
        </p>
        <p>
          Ordered Amount:{" "}
          <span className="capitalize">{product?.data?.orderAmount}</span>
        </p>
        <p>
          Payable Amount:{" "}
          <span className="capitalize">${product?.data?.payableAmount}</span>
        </p>
        <div className="w-full mt-3">
          <Elements stripe={stripePromise}>
            <CheckoutForm product={product.data} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
