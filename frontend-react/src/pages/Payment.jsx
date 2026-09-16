import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css";

function Payment() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [paymentState, setPaymentState] = useState("ready");

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

  const startPayment = () => {
    setPaymentState("processing");

    setTimeout(() => {
      setPaymentState("success");

      const payment = {
        paymentId: `PAY-${Date.now()}`,
        amount: totalAmount,
        method: "UPI",
        status: "SUCCESS",
        date: new Date().toISOString(),
      };

      sessionStorage.setItem(
        "smartCartPayment",
        JSON.stringify(payment)
      );
    }, 1800);
  };

  const viewBill = () => {
    navigate("/bill");
  };

  return (
    <div className="payment-page">
      <header className="payment-header">
        <button
          className="back-button"
          onClick={() => navigate("/checkout")}
          disabled={paymentState === "processing"}
        >
          ←
        </button>

        <div>
          <h1>UPI Payment</h1>
          <p>Complete your Smart Shopping Cart payment.</p>
        </div>
      </header>

      <main className="payment-content">
        {paymentState === "ready" && (
          <>
            <section className="payment-card">
              <div className="upi-icon">
                UPI
              </div>

              <h2>Pay ₹{totalAmount}</h2>

              <p className="payment-description">
                Scan the QR code or use your preferred UPI
                application to complete the payment.
              </p>

              <div className="qr-placeholder">
                <div className="qr-box">
                  <div className="qr-pattern">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>

                <p>Demo UPI QR</p>
              </div>

              <button
                className="pay-button"
                onClick={startPayment}
              >
                Simulate UPI Payment
              </button>
            </section>

            <section className="payment-summary">
              <h2>Payment Summary</h2>

              <div className="summary-row">
                <span>Items</span>
                <strong>{totalItems}</strong>
              </div>

              <div className="summary-row">
                <span>Verified Products</span>
                <strong>{cartItems.length}</strong>
              </div>

              <div className="summary-row">
                <span>Payment Method</span>
                <strong>UPI</strong>
              </div>

              <div className="summary-line"></div>

              <div className="total-row">
                <span>Total Paid</span>
                <strong>₹{totalAmount}</strong>
              </div>
            </section>

            <div className="demo-note">
              <strong>Demo Mode</strong>

              <p>
                This is a frontend payment simulation. No real
                money will be transferred.
              </p>
            </div>
          </>
        )}

        {paymentState === "processing" && (
          <section className="payment-status processing">
            <div className="loading-circle"></div>

            <h2>Processing Payment...</h2>

            <p>
              Please wait while your UPI payment is being
              processed.
            </p>

            <div className="processing-amount">
              ₹{totalAmount}
            </div>
          </section>
        )}

        {paymentState === "success" && (
          <section className="payment-status success">
            <div className="success-icon">✓</div>

            <h2>Payment Successful</h2>

            <p>
              Your payment of{" "}
              <strong>₹{totalAmount}</strong> has been
              successfully completed.
            </p>

            <div className="payment-success-details">
              <div>
                <span>Payment Method</span>
                <strong>UPI</strong>
              </div>

              <div>
                <span>Amount</span>
                <strong>₹{totalAmount}</strong>
              </div>

              <div>
                <span>Status</span>
                <strong>Successful</strong>
              </div>
            </div>

            <button
              className="bill-button"
              onClick={viewBill}
            >
              View Bill →
            </button>
          </section>
        )}
      </main>
    </div>
  );
}

export default Payment;