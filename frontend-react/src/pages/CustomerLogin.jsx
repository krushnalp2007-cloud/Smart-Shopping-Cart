import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerLogin.css";

function CustomerLogin() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    if (!name.trim() || !mobile.trim()) {
      setError("Please enter your name and mobile number.");
      return;
    }

    if (mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    const customer = {
      name: name.trim(),
      mobile,
      role: "customer",
    };

    localStorage.setItem(
      "smartCartUser",
      JSON.stringify(customer)
    );

    navigate("/customer");
  };

  return (
    <div className="customer-login-page">

      <div className="customer-login-background"></div>

      <main className="customer-login-container">

        <section className="customer-login-info">

          <button
            className="customer-top-back"
            onClick={() => navigate("/")}
          >
            ← Back
          </button>

          <div className="customer-brand">
            <span>🛒</span>
            SmartCart
          </div>

          <h1>
            Your smarter
            <br />
            shopping journey
            <br />
            <span>starts here.</span>
          </h1>

          <p>
            Scan products, verify your purchases and
            complete checkout without waiting in long
            billing queues.
          </p>

          <div className="customer-benefits">

            <div className="customer-benefit">
              <span>✓</span>
              <div>
                <strong>Quick scanning</strong>
                <small>
                  Add products while you shop.
                </small>
              </div>
            </div>

            <div className="customer-benefit">
              <span>✓</span>
              <div>
                <strong>Smart verification</strong>
                <small>
                  Verify products before checkout.
                </small>
              </div>
            </div>

            <div className="customer-benefit">
              <span>✓</span>
              <div>
                <strong>Seamless checkout</strong>
                <small>
                  Review your cart and pay easily.
                </small>
              </div>
            </div>

          </div>

        </section>

        <section className="customer-login-card">

          <div className="customer-login-heading">

            <div className="customer-login-icon">
              👤
            </div>

            <div>
              <span>Customer Account</span>
              <h2>Welcome back</h2>
            </div>

          </div>

          <p className="customer-login-description">
            Enter your details to continue shopping.
          </p>

          <form onSubmit={handleLogin}>

            <div className="customer-form-group">

              <label htmlFor="customer-name">
                Full Name
              </label>

              <input
                id="customer-name"
                type="text"
                placeholder="e.g. Krushnal Patil"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setError("");
                }}
              />

            </div>

            <div className="customer-form-group">

              <label htmlFor="customer-mobile">
                Mobile Number
              </label>

              <input
                id="customer-mobile"
                type="tel"
                inputMode="numeric"
                maxLength="10"
                placeholder="10-digit mobile number"
                value={mobile}
                onChange={(event) => {
                  const value = event.target.value.replace(
                    /\D/g,
                    ""
                  );

                  setMobile(value);
                  setError("");
                }}
              />

              <small className="customer-input-note">
                Used only for your customer account.
              </small>

            </div>

            {error && (
              <div className="customer-login-error">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              className="customer-login-button"
            >
              Continue Shopping
              <span>→</span>
            </button>

          </form>

          <div className="customer-login-security">
            <span>🔒</span>
            Your shopping session is protected
          </div>

        </section>

      </main>

      <footer className="customer-login-footer">
        SMART SHOPPING CART • CUSTOMER PORTAL
      </footer>

    </div>
  );
}

export default CustomerLogin;