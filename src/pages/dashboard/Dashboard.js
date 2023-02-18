import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="drawer drawer-mobile mt-16">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center ">
        <h1 className="text-2xl mt-2 font-bold ">Welcome to Dashboard</h1>
        <Outlet />
      </div>
      <div className="drawer-side mt-7">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 gap-2 overflow-y-auto w-80 bg-base-100 text-base-content">
          <li>
            <Link to="/dashboard">My Profile</Link>
          </li>
          {/* {!admin.data.admin && <>
                <li><Link to='/dashboard/myItems'>My Items</Link></li>
                <li><Link to='/dashboard/addReview'>Add a review</Link></li>
            </>} */}
          {/* {
                admin.data.admin && <>
                    <li><Link to='/dashboard/manageOrders'>Manage All Orders</Link></li>
                    <li><Link to='/dashboard/addProduct'>Add Product</Link></li>
                    <li><Link to='/dashboard/allUsers'>All Users</Link></li>
                    <li><Link to='/dashboard/manageProducts'>Manage Products</Link></li>
                </>
            } */}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
