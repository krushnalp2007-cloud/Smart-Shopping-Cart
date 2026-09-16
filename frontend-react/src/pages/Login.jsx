import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-page">

      <div className="login-background-shape login-shape-one"></div>
      <div className="login-background-shape login-shape-two"></div>

      <main className="login-container">

        <section className="login-brand-section">

          <div className="brand-badge">
            <span>🛒</span>
            SmartCart
          </div>

          <h1>
            Smarter shopping.
            <br />
            <span>Faster checkout.</span>
          </h1>

          <p>
            A smart shopping experience with automated
            product verification and seamless checkout.
          </p>

          <div className="feature-row">
            <div className="feature-item">
              <span>▣</span>
              <p>Smart Scanning</p>
            </div>

            <div className="feature-item">
              <span>✓</span>
              <p>Product Verification</p>
            </div>

            <div className="feature-item">
              <span>₹</span>
              <p>Easy Checkout</p>
            </div>
          </div>

        </section>

        <section className="login-card">

          <div className="login-card-header">

            <div className="login-icon">
              🛒
            </div>

            <div>
              <p className="welcome-label">
                WELCOME TO SMARTCART
              </p>

              <h2>Choose your account</h2>
            </div>

          </div>

          <p className="login-description">
            Select how you want to continue.
          </p>

          <div className="role-options">

            <button
              className="role-card customer-role"
              onClick={() => navigate("/customer-login")}
            >

              <div className="role-icon">
                👤
              </div>

              <div className="role-text">
                <span className="role-title">
                  Customer
                </span>

                <span className="role-description">
                  Scan products, verify your items and
                  checkout quickly.
                </span>
              </div>

              <span className="role-arrow">
                →
              </span>

            </button>

            <button
              className="role-card retailer-role"
              onClick={() => navigate("/retailer-login")}
            >

              <div className="role-icon">
                🏪
              </div>

              <div className="role-text">
                <span className="role-title">
                  Retailer
                </span>

                <span className="role-description">
                  Manage products, inventory, sales and
                  security alerts.
                </span>
              </div>

              <span className="role-arrow">
                →
              </span>

            </button>

          </div>

          <div className="login-security">
            <span>🔒</span>
            Secure shopping experience
          </div>

        </section>

      </main>

      <footer className="login-footer">
        SMART SHOPPING CART • COLLEGE PROJECT PROTOTYPE
      </footer>

    </div>
  );
}

export default Login;