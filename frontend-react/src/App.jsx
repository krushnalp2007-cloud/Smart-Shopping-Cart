import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import CustomerLogin from "./pages/CustomerLogin";
import RetailerLogin from "./pages/RetailerLogin";

import CustomerHome from "./pages/CustomerHome";
import Scanner from "./pages/Scanner";
import ShoppingList from "./pages/ShoppingList";
import VerifyWeight from "./pages/VerifyWeight";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Bill from "./pages/Bill";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Main Role Selection */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Customer Login */}
        <Route
          path="/customer-login"
          element={<CustomerLogin />}
        />

        {/* Retailer Login */}
        <Route
          path="/retailer-login"
          element={<RetailerLogin />}
        />

        {/* Customer Pages */}
        <Route
          path="/customer"
          element={<CustomerHome />}
        />

        <Route
          path="/scanner"
          element={<Scanner />}
        />

        <Route
          path="/verify-weight"
          element={<VerifyWeight />}
        />

        <Route
          path="/shopping-list"
          element={<ShoppingList />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/payment"
          element={<Payment />}
        />

        <Route
          path="/bill"
          element={<Bill />}
        />

        {/* Unknown URL */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;