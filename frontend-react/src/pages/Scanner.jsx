import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Scanner.css";

const products = {
  "111111": {
    id: "P001",
    barcode: "111111",
    name: "Sugar",
    price: 50,
    expectedWeight: 1000,
    unit: "1 kg",
  },
  "222222": {
    id: "P002",
    barcode: "222222",
    name: "Rice",
    price: 60,
    expectedWeight: 1000,
    unit: "1 kg",
  },
  "333333": {
    id: "P003",
    barcode: "333333",
    name: "Biscuits",
    price: 30,
    expectedWeight: 200,
    unit: "200 g",
  },
};

function Scanner() {
  const navigate = useNavigate();

  const [cameraStarted, setCameraStarted] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [barcodeInput, setBarcodeInput] = useState("");
  const [detectedProduct, setDetectedProduct] = useState(null);
  const [error, setError] = useState("");

  const startCamera = () => {
    setCameraStarted(true);
    setError("");
  };

  const simulateScan = () => {
    setScanning(true);
    setError("");
    setDetectedProduct(null);

    setTimeout(() => {
      const barcode = barcodeInput.trim() || "111111";
      const product = products[barcode];

      if (!product) {
        setError(
          "Product not found. Try barcode 111111, 222222, or 333333."
        );
        setScanning(false);
        return;
      }

      setDetectedProduct(product);
      setScanning(false);
    }, 1000);
  };

  const continueToVerification = () => {
    if (!detectedProduct) {
      return;
    }

    /*
      Temporary frontend session data.

      Later this information will come from the backend API
      after Google ML Kit detects the barcode.
    */
    sessionStorage.setItem(
      "smartCartPendingProduct",
      JSON.stringify(detectedProduct)
    );

    navigate("/verify-weight");
  };

  return (
    <div className="scanner-page">
      <header className="scanner-header">
        <button
          className="back-button"
          onClick={() => navigate("/customer")}
        >
          ←
        </button>

        <div>
          <h1>Scan Product</h1>
          <p>Scan the product before placing it in the trolley.</p>
        </div>
      </header>

      <main className="scanner-content">
        <section className="camera-card">
          <div className="camera-area">
            {!cameraStarted ? (
              <div className="camera-placeholder">
                <div className="camera-icon">📷</div>
                <h2>Camera Ready</h2>
                <p>
                  Your smartphone camera will be used to scan the
                  product barcode.
                </p>

                <button
                  className="primary-button"
                  onClick={startCamera}
                >
                  Start Camera
                </button>
              </div>
            ) : (
              <div className="camera-active">
                <div className="camera-top-label">
                  SMART CART CAMERA
                </div>

                <div className="scan-frame">
                  <span className="corner top-left"></span>
                  <span className="corner top-right"></span>
                  <span className="corner bottom-left"></span>
                  <span className="corner bottom-right"></span>

                  <div className="scan-line"></div>
                </div>

                <p className="camera-status">
                  {scanning
                    ? "Scanning barcode..."
                    : "Point the camera toward the barcode"}
                </p>
              </div>
            )}
          </div>

          {cameraStarted && (
            <div className="scanner-controls">
              <label htmlFor="barcode">
                Demo Barcode
              </label>

              <input
                id="barcode"
                type="text"
                value={barcodeInput}
                onChange={(event) =>
                  setBarcodeInput(event.target.value)
                }
                placeholder="Example: 111111"
              />

              <button
                className="primary-button"
                onClick={simulateScan}
                disabled={scanning}
              >
                {scanning ? "Scanning..." : "Simulate Scan"}
              </button>

              <p className="demo-hint">
                Demo products: Sugar = 111111, Rice = 222222,
                Biscuits = 333333
              </p>
            </div>
          )}
        </section>

        {error && (
          <div className="error-box">
            <strong>Scan Error</strong>
            <p>{error}</p>
          </div>
        )}

        {detectedProduct && (
          <section className="product-card">
            <div className="success-badge">
              ✓ Barcode Detected
            </div>

            <h2>{detectedProduct.name}</h2>

            <div className="product-details">
              <div className="detail-row">
                <span>Product ID</span>
                <strong>{detectedProduct.id}</strong>
              </div>

              <div className="detail-row">
                <span>Barcode</span>
                <strong>{detectedProduct.barcode}</strong>
              </div>

              <div className="detail-row">
                <span>Price</span>
                <strong>₹{detectedProduct.price}</strong>
              </div>

              <div className="detail-row">
                <span>Expected Weight</span>
                <strong>
                  {detectedProduct.expectedWeight} g
                </strong>
              </div>

              <div className="detail-row">
                <span>Pack Size</span>
                <strong>{detectedProduct.unit}</strong>
              </div>
            </div>

            <div className="pending-message">
              <strong>Product is not verified yet.</strong>
              <p>
                Place this product in the trolley. The system will
                verify its identity and weight before adding it to
                your cart.
              </p>
            </div>

            <button
              className="continue-button"
              onClick={continueToVerification}
            >
              Continue to Verification →
            </button>
          </section>
        )}

        <section className="verification-info">
          <h3>How verification works</h3>

          <div className="verification-steps">
            <div>
              <span>1</span>
              <p>Scan barcode</p>
            </div>

            <div>
              <span>2</span>
              <p>Place product</p>
            </div>

            <div>
              <span>3</span>
              <p>Check identity + weight</p>
            </div>

            <div>
              <span>4</span>
              <p>Add only if verified</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Scanner;