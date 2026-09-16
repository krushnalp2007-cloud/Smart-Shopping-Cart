import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Bill.css";

function Bill() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    const storedCart = JSON.parse(
      sessionStorage.getItem("smartCartCart") || "[]"
    );

    const storedPayment = JSON.parse(
      sessionStorage.getItem("smartCartPayment") || "null"
    );

    setCartItems(storedCart);
    setPayment(storedPayment);
  }, []);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const billNumber =
    payment?.paymentId || `BILL-${Date.now()}`;

  const paymentDate = payment?.date
    ? new Date(payment.date).toLocaleString("en-IN")
    : new Date().toLocaleString("en-IN");

  const startNewShopping = () => {
    sessionStorage.removeItem("smartCartCart");
    sessionStorage.removeItem("smartCartPayment");
    sessionStorage.removeItem("smartCartPendingProduct");

    navigate("/customer");
  };

  return (
    <div className="bill-page">
      <main className="bill-container">
        <section className="bill-card">
          <div className="bill-success">
            <div className="bill-success-icon">✓</div>

            <h1>Payment Successful</h1>

            <p>
              Thank you for shopping with Smart Shopping Cart.
            </p>
          </div>

          <div className="bill-brand">
            <h2>SMART SHOPPING CART</h2>
            <p>Smart • Secure • Seamless Shopping</p>
          </div>

          <div className="bill-meta">
            <div>
              <span>Bill / Payment ID</span>
              <strong>{billNumber}</strong>
            </div>

            <div>
              <span>Date & Time</span>
              <strong>{paymentDate}</strong>
            </div>
          </div>

          <div className="bill-divider"></div>

          <section className="items-section">
            <div className="items-header">
              <span>Product</span>
              <span>Amount</span>
            </div>

            {cartItems.length === 0 ? (
              <div className="no-items">
                No cart items found.
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  className="bill-item"
                  key={item.id}
                >
                  <div className="bill-item-info">
                    <strong>{item.name}</strong>

                    <span>
                      Barcode: {item.barcode}
                    </span>

                    <span>
                      Qty: {item.quantity} × ₹{item.price}
                    </span>

                    <span className="bill-verified">
                      ✓ Verified
                    </span>
                  </div>

                  <strong>
                    ₹{item.price * item.quantity}
                  </strong>
                </div>
              ))
            )}
          </section>

          <div className="bill-divider"></div>

          <section className="bill-total-section">
            <div className="bill-row">
              <span>Total Items</span>
              <strong>{totalItems}</strong>
            </div>

            <div className="bill-row">
              <span>Verified Products</span>
              <strong>{cartItems.length}</strong>
            </div>

            <div className="bill-row">
              <span>Service Fee</span>
              <strong>₹0</strong>
            </div>

            <div className="bill-divider"></div>

            <div className="bill-grand-total">
              <span>Total Paid</span>
              <strong>₹{totalAmount}</strong>
            </div>
          </section>

          <section className="payment-status">
            <div>
              <span>Payment Method</span>
              <strong>UPI</strong>
            </div>

            <div>
              <span>Payment Status</span>
              <strong className="paid">PAID ✓</strong>
            </div>
          </section>

          <div className="bill-footer">
            <p>
              All products shown above passed the Smart Cart
              verification process before checkout.
            </p>

            <strong>Thank you for using Smart Shopping Cart!</strong>
          </div>
        </section>

        <div className="bill-actions">
          <button
            className="print-button"
            onClick={() => window.print()}
          >
            🖨 Print Bill
          </button>

          <button
            className="new-shopping-button"
            onClick={startNewShopping}
          >
            Start New Shopping →
          </button>
        </div>
      </main>
    </div>
  );
}

export default Bill;