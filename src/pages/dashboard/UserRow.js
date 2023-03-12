import React from "react";
import Swal from "sweetalert2";
import axiosPrivate from "../../API/axiosPrivate";

const UserRow = ({ index, user, refetch }) => {
  // console.log("user", user);

  const { email, role, _id } = user;
  const handleMakeAdmin = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#F2CA73",
      cancelButtonColor: "#EE4B2B",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPrivate
          .put(`http://localhost:5000/api/user/admin/${email}`)
          .then(() => refetch());
        Swal.fire(
          "Done!",
          // `${name} has been made an Admin`,
          "success"
        );
      }
    });
  };

  const removeUser = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPrivate
          .delete(`http://localhost:5000/api/user/delete/${_id}`)
          .then(() => refetch());
        Swal.fire("Deleted!", "Your User has been removed.", "success");
      }
    });
  };

  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              {
                // image ? <img src={image} alt="Avatar Tailwind CSS Component" /> :
                //     <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mt-1 " viewBox="0 0 20 20" fill="currentColor">
                //         <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                //     </svg>
              }
            </div>
          </div>
          <div>
            {/* <div className="font-bold">{user.name}</div> */}
            {/* <div className="text-sm opacity-50">{location}</div> */}
          </div>
        </div>
      </td>
      <td>
        {/* {education}
                <br />
                <span className="badge badge-ghost badge-sm underline"><a href={linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn Profile</a></span> */}
      </td>
      <td>{user.email}</td>
      <th>
        {role === "Admin" ? (
          <button className="btn btn-warning text-gray-100 btn-sm">
            Admin
          </button>
        ) : (
          <button onClick={handleMakeAdmin} className="btn btn-primary btn-xs">
            Make Admin
          </button>
        )}
        {role !== "Admin" && (
          <button
            onClick={removeUser}
            className="btn btn-error text-gray-100 btn-xs mx-2 hover:bg-red-800"
            title="Remove user"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </th>
    </tr>
  );
};

export default UserRow;
