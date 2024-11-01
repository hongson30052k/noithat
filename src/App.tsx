import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import ProductPage from "./pages/Product/ProductPage";
import ShopPage from "./pages/Shop/ShopPage";
import SignUpPage from "./pages/SignUp/SignUpPage";
import LoginPage from "./pages/Login/LoginPage";
import AdminPage from "./pages/Admin/AdminPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
}

export default App;