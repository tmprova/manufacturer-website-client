import { useEffect, useState } from "react";

const useToken = (user) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    // console.log("user token", user);
    const email = user?.user?.email;
    // console.log(user?.user?.email);
    const currentUser = { email: email };
    if (email) {
      fetch(`http://localhost:5000/api/user/${email}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(currentUser),
      })
        .then((res) => res.json())
        .then((data) => {
          const token = data.token;
          setToken(token);
          localStorage.setItem("accessToken", token);
        });
    }
  }, [user]);
  return [token];
};

export default useToken;
