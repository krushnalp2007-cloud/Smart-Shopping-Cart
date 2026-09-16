import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RetailerLogin.css";

function RetailerLogin() {
  const navigate = useNavigate();

  const [retailerName, setRetailerName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeId, setStoreId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    if (
      !retailerName.trim() ||
      !storeName.trim() ||
      !storeId.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      setError("Please fill in all retailer details.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    const retailer = {
      retailerName: retailerName.trim(),
      storeName: storeName.trim(),
      storeId: storeId.trim(),
      email: email.trim(),
      role: "retailer",
    };

    localStorage.setItem(
      "smartCartRetailer",
      JSON.stringify(retailer)
    );

    navigate("/retailer");
  };

  return (
    <div className="retailer-login-page">
      <div className="retailer-login-card">

        <div className="retailer-login-icon">
          🏪
        </div>

        <h1>Retailer Login</h1>

        <p className="retailer-login-subtitle">
          Enter your store details to access the retailer
          dashboard.
        </p>

        <form onSubmit={handleLogin}>

          <div className="retailer-form-group">
            <label htmlFor="retailer-name">
              Retailer Name
            </label>

            <input
              id="retailer-name"
              type="text"
              placeholder="Enter retailer name"
              value={retailerName}
              onChange={(event) => {
                setRetailerName(event.target.value);
                setError("");
              }}
            />
          </div>

          <div className="retailer-form-group">
            <label htmlFor="store-name">
              Store Name
            </label>

            <input
              id="store-name"
              type="text"
              placeholder="Enter store name"
              value={storeName}
              onChange={(event) => {
                setStoreName(event.target.value);
                setError("");
              }}
            />
          </div>

          <div className="retailer-form-group">
            <label htmlFor="store-id">
              Store ID
            </label>

            <input
              id="store-id"
              type="text"
              placeholder="Enter store ID"
              value={storeId}
              onChange={(event) => {
                setStoreId(event.target.value);
                setError("");
              }}
            />
          </div>

          <div className="retailer-form-group">
            <label htmlFor="retailer-email">
              Email
            </label>

            <input
              id="retailer-email"
              type="email"
              placeholder="Enter retailer email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
            />
          </div>

          <div className="retailer-form-group">
            <label htmlFor="retailer-password">
              Password
            </label>

            <input
              id="retailer-password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
            />
          </div>

          {error && (
            <div className="retailer-login-error">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            className="retailer-login-button"
          >
            Continue as Retailer →
          </button>

        </form>

        <button
          className="retailer-back-button"
          onClick={() => navigate("/")}
        >
          ← Choose Different Account
        </button>

      </div>
    </div>
  );
}

export default RetailerLogin;