import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase/firebase.init";
import { useQuery } from "react-query";
import axiosPrivate from "../../API/axiosPrivate";
import MyItemsRow from "./MyItemRow";
import Loading from "../../components/Loading";

const Myitems = () => {
  const [user, loading] = useAuthState(auth);
  const email = user.email;
  // console.log(email);
  const {
    data: myOrders,
    isLoading,
    refetch,
  } = useQuery(["myOrders", email], () =>
    axiosPrivate.get(`http://localhost:5000/api/findItems?email=${email}`)
  );
  if (loading || isLoading) return <Loading></Loading>;
  return (
    <div className="w-full">
      <h1 className="text-center font-semibold text-xl mb-2">My Items</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Order Amount</th>
              <th>Total Price</th>
              <th>Actions</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {myOrders.data.map((od, index) => (
              <MyItemsRow
                index={index}
                key={od._id}
                od={od}
                refetch={refetch}
              ></MyItemsRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Myitems;
