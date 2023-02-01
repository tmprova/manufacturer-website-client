import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./components/Notfound";
import Home from "./pages/home/Home";
import Login from "./pages/signup/Login";
import SignUp from "./pages/signup/Signup";
import RequireAuth from "./hooks/RequireAuth";
import Dashboard from "./pages/dashboard/Dashboard";
import RequireAdmin from "./hooks/RequireAdmin";
import Blogs from "./pages/blogs/Blogs";
import MyPortfolio from "./pages/myportfolio/MyPortfolio";
import AllProducts from "./pages/allproducts/AllProducts";

function App() {
  return (
    <div className="App">
      {/* <h1 className="text-3xl font-bold underline">hello there</h1> */}
      <Navbar></Navbar>
      <Routes>
        <Route index element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="/blogs" element={<Blogs></Blogs>}></Route>
        <Route
          path="/myPortfolio"
          element={<MyPortfolio></MyPortfolio>}
        ></Route>
        <Route
          path="/allproducts"
          element={<AllProducts></AllProducts>}
        ></Route>
        {/* <Route
          path="/purchase/:id"
          element={
            <RequireAuth>
              <Purchase></Purchase>
            </RequireAuth>
          }
        ></Route> */}
        {/* <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard></Dashboard>
            </RequireAuth>
          }
        >
          <Route index element={<MyProfile></MyProfile>}></Route>
          <Route
            path="/dashboard/myItems"
            element={<MyItems></MyItems>}
          ></Route>
          <Route
            path="/dashboard/addReview"
            element={<AddReview></AddReview>}
          ></Route>
          <Route
            path="/dashboard/allUsers"
            element={
              <RequireAdmin>
                <AllUsers></AllUsers>
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="/dashboard/manageOrders"
            element={
              <RequireAdmin>
                <ManageOrders></ManageOrders>
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="/dashboard/addProduct"
            element={
              <RequireAdmin>
                <AddProduct></AddProduct>
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="/dashboard/manageProducts"
            element={
              <RequireAdmin>
                <MaanageProducts></MaanageProducts>
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="/dashboard/payment/:id"
            element={<Payment></Payment>}
          ></Route>
        </Route> */}
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
