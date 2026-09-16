import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(
      sessionStorage.getItem("smartCartCart") || "[]"
    );

    setCartItems(storedCart);
  }, []);

  const saveCart = (updatedCart) => {
    setCartItems(updatedCart);

    sessionStorage.setItem(
      "smartCartCart",
      JSON.stringify(updatedCart)
    );
  };

  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );

    saveCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    saveCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(
      (item) => item.id !== id
    );

    saveCart(updatedCart);
  };

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <header className="cart-header">
        <button
          className="back-button"
          onClick={() => navigate("/customer")}
        >
          ←
        </button>

        <div>
          <h1>My Cart</h1>
          <p>
            Only successfully verified products are added.
          </p>
        </div>
      </header>

      <main className="cart-content">
        {cartItems.length === 0 ? (
          <section className="empty-cart">
            <div className="empty-cart-icon">🛒</div>

            <h2>Your cart is empty</h2>

            <p>
              Scan a product and complete verification before
              adding it to your cart.
            </p>

            <button
              className="scan-button"
              onClick={() => navigate("/scanner")}
            >
              Scan Product
            </button>
          </section>
        ) : (
          <>
            <section className="cart-items-section">
              <div className="section-heading">
                <div>
                  <h2>Verified Products</h2>
                  <p>
                    {totalItems}{" "}
                    {totalItems === 1 ? "item" : "items"}
                  </p>
                </div>

                <button
                  className="scan-more-button"
                  onClick={() => navigate("/scanner")}
                >
                  + Scan Another
                </button>
              </div>

              <div className="cart-list">
                {cartItems.map((item) => (
                  <article
                    className="cart-item"
                    key={item.id}
                  >
                    <div className="item-icon">
                      🛍️
                    </div>

                    <div className="item-info">
                      <h3>{item.name}</h3>

                      <p>
                        Barcode: {item.barcode}
                      </p>

                      <p>
                        Weight:{" "}
                        {item.measuredWeight
                          ? `${item.measuredWeight} g`
                          : `${item.expectedWeight} g`}
                      </p>

                      {item.verified && (
                        <span className="verified-label">
                          ✓ Verified
                        </span>
                      )}
                    </div>

                    <div className="item-price">
                      <strong>
                        ₹{item.price * item.quantity}
                      </strong>

                      <span>
                        ₹{item.price} each
                      </span>
                    </div>

                    <div className="quantity-control">
                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="remove-button"
                      onClick={() =>
                        removeItem(item.id)
                      }
                    >
                      Remove
                    </button>
                  </article>
                ))}
              </div>
            </section>

            <section className="cart-summary">
              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Items</span>
                <strong>{totalItems}</strong>
              </div>

              <div className="summary-row">
                <span>Verified Products</span>
                <strong>{cartItems.length}</strong>
              </div>

              <div className="summary-divider"></div>

              <div className="total-row">
                <span>Total</span>
                <strong>₹{totalAmount}</strong>
              </div>

              <button
                className="checkout-button"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout →
              </button>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default Cart;