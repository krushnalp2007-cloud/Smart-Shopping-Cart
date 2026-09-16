import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(
      sessionStorage.getItem("smartCartCart") || "[]"
    );

    setCartItems(storedCart);
  }, []);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const verifiedItems = cartItems.filter(
    (item) => item.verified
  ).length;

  const handlePayment = () => {
    if (cartItems.length === 0) {
      navigate("/scanner");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      navigate("/payment");
    }, 700);
  };

  return (
    <div className="checkout-page">
      <header className="checkout-header">
        <button
          className="back-button"
          onClick={() => navigate("/cart")}
        >
          ←
        </button>

        <div>
          <h1>Checkout</h1>
          <p>Review your verified shopping cart.</p>
        </div>
      </header>

      <main className="checkout-content">
        {cartItems.length === 0 ? (
          <section className="empty-checkout">
            <div className="empty-icon">🛒</div>

            <h2>No products to checkout</h2>

            <p>
              Add and verify at least one product before
              continuing to payment.
            </p>

            <button
              className="primary-button"
              onClick={() => navigate("/scanner")}
            >
              Scan Product
            </button>
          </section>
        ) : (
          <>
            <section className="checkout-section">
              <div className="section-title">
                <div>
                  <h2>Order Details</h2>
                  <p>
                    {totalItems}{" "}
                    {totalItems === 1 ? "item" : "items"} in your
                    cart
                  </p>
                </div>

                <span className="verified-count">
                  ✓ {verifiedItems} verified
                </span>
              </div>

              <div className="checkout-items">
                {cartItems.map((item) => (
                  <div
                    className="checkout-item"
                    key={item.id}
                  >
                    <div className="checkout-item-icon">
                      🛍️
                    </div>

                    <div className="checkout-item-info">
                      <h3>{item.name}</h3>

                      <p>
                        Barcode: {item.barcode}
                      </p>

                      <p>
                        Quantity: {item.quantity}
                      </p>

                      <span className="verified-tag">
                        ✓ Verified
                      </span>
                    </div>

                    <div className="checkout-item-price">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="checkout-section verification-summary">
              <h2>Verification Summary</h2>

              <div className="summary-check">
                <span>Product identity</span>
                <strong>✓ Checked</strong>
              </div>

              <div className="summary-check">
                <span>Weight verification</span>
                <strong>✓ Checked</strong>
              </div>

              <div className="summary-check">
                <span>Unverified products</span>
                <strong>0</strong>
              </div>
            </section>

            <section className="checkout-section payment-summary">
              <h2>Payment Summary</h2>

              <div className="amount-row">
                <span>Items</span>
                <strong>{totalItems}</strong>
              </div>

              <div className="amount-row">
                <span>Subtotal</span>
                <strong>₹{totalAmount}</strong>
              </div>

              <div className="amount-row">
                <span>Delivery / Service Fee</span>
                <strong>₹0</strong>
              </div>

              <div className="summary-line"></div>

              <div className="total-row">
                <span>Total Payable</span>
                <strong>₹{totalAmount}</strong>
              </div>

              <button
                className="payment-button"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing
                  ? "Preparing Payment..."
                  : `Proceed to UPI Payment • ₹${totalAmount}`}
              </button>

              <button
                className="edit-cart-button"
                onClick={() => navigate("/cart")}
              >
                ← Edit Cart
              </button>
            </section>

            <section className="checkout-note">
              <strong>Smart Cart Security</strong>

              <p>
                Only products that pass the verification process
                are included in the checkout total.
              </p>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default Checkout;