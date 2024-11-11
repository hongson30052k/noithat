import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import ProductPage from "./pages/Product/ProductPage";
import ShopPage from "./pages/Shop/ShopPage";
import SignUpPage from "./pages/SignUp/SignUpPage";
import LoginPage from "./pages/Login/LoginPage";
import AdminPage from "./pages/Admin/AdminPage";
import UserLoginPage from "./pages/UserLogin/UserLoginPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUserFromLocalStorage } from "./store/slices/UserSlice";
import OrderPagePage from "./pages/CheckoutPage/CheckoutPage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    console.log(userFromLocalStorage, "userFromLocalStorage");
    if (userFromLocalStorage) { 
      dispatch(setUserFromLocalStorage(JSON.parse(userFromLocalStorage)));
    }
  }, [dispatch]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/userLogin" element={<UserLoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/order" element={<OrderPagePage />} />
      </Routes>
    </div>
  );
}

export default App;
