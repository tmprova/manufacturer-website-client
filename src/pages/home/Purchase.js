import React, { useEffect, useState } from "react";
import ProductsCard from "./products/ProductCard";
import { useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase/firebase.init";
import axios from "axios";
import axiosPrivate from "../../API/axiosPrivate";
import { toast } from "react-toastify";

const Purchase = () => {
  const { id } = useParams();
  const [disabled, setDisabled] = useState(false);
  const [product, setProduct] = useState({});
  const [user] = useAuthState(auth);
  const [amountError, setAmountError] = useState("");

  useEffect(() => {
    axiosPrivate
      .get(`http://localhost:5000/api/orders/${id}`)
      .then((data) => setProduct(data.data));
  }, [id]);

  const handlePurchaseOrder = (e) => {
    e.preventDefault();
    setAmountError("");
    const orderAmount = parseInt(e.target.amount.value);
    if (orderAmount < product.minOrder || orderAmount > product.stock) {
      setAmountError(
        `Sorry, You cannot order less than ${product.minOrder} units or more than ${product.stock}`
      );
      e.target.reset();
      return setDisabled(true);
    }
    const order = {
      product: product.name,
      productId: product._id,
      payableAmount: Math.round(product.price * orderAmount),
      orderAmount,
      phone: e.target.phone.value,
      address: e.target.address.value,
      userName: e.target.userName.value,
      email: e.target.email.value,
    };

    axios.post("http://localhost:5000/api/orders/", order).then((data) => {
      if (data.data.success) {
        toast.success(`Your Order for ${product.name} has been Placed`);
      }
    });
    // console.log("order", order);
    e.target.reset();
  };

  return (
    <div className="mt-16 lg:mt-8 min-h-screen flex flex-wrap gap-20 items-center justify-center">
      <ProductsCard pd={product} />
      <div className="divider divider-horizontal hidden md:flex"></div>

      <div className="card w-96 bg-base-300 shadow-xl">
        <div className="card-body">
          <form onSubmit={handlePurchaseOrder}>
            <h1 className="text-center text-lg font-semibold underline mb-4 capitalize">
              Order For: {product.name}
            </h1>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Your Name</span>
              </label>
              <input
                disabled
                value={user.displayName}
                name="userName"
                type="text"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>
              <input
                disabled
                value={user.email}
                type="email"
                name="email"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="text"
                name="phone"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <input
                type="text"
                name="address"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Order Amount</span>
              </label>
              <input
                onChange={() => setDisabled(false)}
                // defaultValue={product.minOrder}
                placeholder={`minimum order amount ${product.minOrder}`}
                type="number"
                name="amount"
                required
                className="input input-bordered w-full"
              />
              <label className="label">
                <span className="label-text-alt text-red-600 mb-2">
                  {amountError}
                </span>
              </label>
            </div>

            <input
              disabled={disabled}
              className="btn btn-primary w-full"
              value="Place order"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
