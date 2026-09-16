import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerHome.css";

function CustomerHome() {
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("Customer");

  useEffect(() => {
    const savedUser = localStorage.getItem("smartCartUser");

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);

        if (user.name) {
          setCustomerName(user.name);
        }
      } catch (error) {
        console.error("Unable to read customer details.");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("smartCartUser");
    navigate("/");
  };

  return (
    <div className="customer-home-page">

      {/* HEADER */}
      <header className="customer-header">

        <div className="customer-logo-section">
          <div className="customer-logo">
            🛒
          </div>

          <div className="customer-logo-text">
            <h2>SmartCart</h2>
            <span>Smart Shopping</span>
          </div>
        </div>

        <div className="customer-header-right">

          <div className="customer-account">
            <div className="customer-avatar">
              {customerName.charAt(0).toUpperCase()}
            </div>

            <div className="customer-account-text">
              <span>Welcome</span>
              <strong>{customerName}</strong>
            </div>
          </div>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>


      {/* MAIN CONTENT */}
      <main className="customer-main">

        {/* WELCOME */}
        <section className="customer-hero">

          <div className="hero-text">

            <span className="hero-label">
              CUSTOMER DASHBOARD
            </span>

            <h1>
              Hello,{" "}
              <span>{customerName}</span> 👋
            </h1>

            <p>
              Ready to shop? Scan your products, verify them
              as you add them to your cart, and checkout easily.
            </p>

          </div>

          <div className="verification-status">

            <span className="status-indicator"></span>

            <div>
              <strong>Smart Verification</strong>
              <small>Active</small>
            </div>

          </div>

        </section>


        {/* MAIN SHOPPING AREA */}
        <section className="shopping-section">

          {/* START SHOPPING */}
          <button
            className="start-shopping-card"
            onClick={() => navigate("/scanner")}
          >

            <div className="start-shopping-top">

              <div className="start-icon">
                📷
              </div>

              <span className="card-arrow">
                →
              </span>

            </div>

            <div className="start-shopping-content">

              <span className="card-label">
                START SHOPPING
              </span>

              <h2>
                Scan a Product
              </h2>

              <p>
                Scan the barcode of a product to see its
                details and add it to your verified cart.
              </p>

            </div>

            <div className="start-shopping-bottom">
              Start scanning
              <span>→</span>
            </div>

          </button>


          {/* SECONDARY ACTIONS */}
          <div className="secondary-actions">

            <button
              className="secondary-card"
              onClick={() => navigate("/cart")}
            >

              <div className="secondary-icon cart-icon">
                🛒
              </div>

              <div className="secondary-content">

                <span>YOUR SHOPPING</span>

                <h3>
                  View Cart
                </h3>

                <p>
                  Review your verified products and total.
                </p>

              </div>

              <span className="secondary-arrow">
                →
              </span>

            </button>


            <button
              className="secondary-card"
              onClick={() => navigate("/shopping-list")}
            >

              <div className="secondary-icon list-icon">
                ☑
              </div>

              <div className="secondary-content">

                <span>PLAN AHEAD</span>

                <h3>
                  Shopping List
                </h3>

                <p>
                  Keep track of products you want to buy.
                </p>

              </div>

              <span className="secondary-arrow">
                →
              </span>

            </button>

          </div>

        </section>


        {/* HOW SMARTCART WORKS */}
        <section className="how-section">

          <div className="section-heading">

            <span>
              HOW IT WORKS
            </span>

            <h2>
              Simple shopping. Smart verification.
            </h2>

          </div>


          <div className="steps-container">

            <div className="step-card">

              <div className="step-number">
                01
              </div>

              <div className="step-icon">
                📷
              </div>

              <h3>
                Scan
              </h3>

              <p>
                Scan the product barcode using the
                smartphone camera.
              </p>

            </div>


            <div className="step-connector">
              →
            </div>


            <div className="step-card">

              <div className="step-number">
                02
              </div>

              <div className="step-icon">
                🛡️
              </div>

              <h3>
                Verify
              </h3>

              <p>
                The system checks the product identity
                and physical weight.
              </p>

            </div>


            <div className="step-connector">
              →
            </div>


            <div className="step-card">

              <div className="step-number">
                03
              </div>

              <div className="step-icon">
                🛒
              </div>

              <h3>
                Add to Cart
              </h3>

              <p>
                Verified products are added to your
                shopping cart.
              </p>

            </div>


            <div className="step-connector">
              →
            </div>


            <div className="step-card">

              <div className="step-number">
                04
              </div>

              <div className="step-icon">
                ₹
              </div>

              <h3>
                Checkout
              </h3>

              <p>
                Complete your payment and receive
                your digital bill.
              </p>

            </div>

          </div>

        </section>


        {/* INFORMATION */}
        <section className="customer-benefits">

          <div className="benefit-item">

            <div className="benefit-icon">
              🛡️
            </div>

            <div>
              <h3>
                Product Verification
              </h3>

              <p>
                Helps detect mismatches before checkout.
              </p>
            </div>

          </div>


          <div className="benefit-item">

            <div className="benefit-icon">
              ⚡
            </div>

            <div>
              <h3>
                Faster Checkout
              </h3>

              <p>
                Shop without waiting in a traditional billing queue.
              </p>
            </div>

          </div>


          <div className="benefit-item">

            <div className="benefit-icon">
              🔒
            </div>

            <div>
              <h3>
                Secure Shopping
              </h3>

              <p>
                Verification happens before final checkout.
              </p>
            </div>

          </div>

        </section>

      </main>


      {/* FOOTER */}
      <footer className="customer-footer">
        SMARTCART • SMART SHOPPING EXPERIENCE
      </footer>

    </div>
  );
}

export default CustomerHome;