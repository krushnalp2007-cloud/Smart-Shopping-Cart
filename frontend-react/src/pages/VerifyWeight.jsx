import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserMultiFormatReader } from "@zxing/browser";
import "./VerifyWeight.css";

function VerifyWeight() {
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const readerRef = useRef(null);

  const [product, setProduct] = useState(null);

  const [cameraStatus, setCameraStatus] = useState("off");
  const [cameraError, setCameraError] = useState("");

  const [verificationStatus, setVerificationStatus] =
    useState("waiting");

  const [detectedBarcode, setDetectedBarcode] = useState("");

  const [demoMode, setDemoMode] = useState(false);

  const [weightStatus, setWeightStatus] = useState("waiting");

  useEffect(() => {
    const savedProduct = sessionStorage.getItem(
      "smartCartPendingProduct"
    );

    if (!savedProduct) {
      navigate("/scanner");
      return;
    }

    try {
      setProduct(JSON.parse(savedProduct));
    } catch (error) {
      sessionStorage.removeItem("smartCartPendingProduct");
      navigate("/scanner");
    }

    return () => {
      stopCamera();
    };
  }, [navigate]);

  const stopCamera = () => {
    try {
      if (readerRef.current) {
        readerRef.current.reset();
        readerRef.current = null;
      }
    } catch (error) {
      console.log("Camera stop:", error);
    }

    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });

      videoRef.current.srcObject = null;
    }

    setCameraStatus("off");
  };

  const startCamera = async () => {
    if (!product) return;

    setCameraError("");
    setDetectedBarcode("");
    setVerificationStatus("waiting");
    setCameraStatus("starting");

    try {
      const reader = new BrowserMultiFormatReader();

      readerRef.current = reader;

      const devices =
        await BrowserMultiFormatReader.listVideoInputDevices();

      if (!devices || devices.length === 0) {
        throw new Error("No camera was found.");
      }

      const selectedDevice = devices[devices.length - 1];

      setCameraStatus("active");

      reader.decodeFromVideoDevice(
        selectedDevice.deviceId,
        videoRef.current,
        (result, error) => {
          if (result) {
            const barcode = result.getText();

            setDetectedBarcode(barcode);

            if (barcode === product.barcode) {
              setVerificationStatus("matched");

              stopCamera();
            } else {
              setVerificationStatus("mismatch");

              stopCamera();
            }
          }
        }
      );
    } catch (error) {
      console.error(error);

      setCameraStatus("error");

      setCameraError(
        "Unable to start the camera. Please allow camera permission and try again."
      );
    }
  };

  const verifyWithDemo = () => {
    if (!product) return;

    setDemoMode(true);
    setDetectedBarcode(product.barcode);
    setVerificationStatus("matched");
    stopCamera();
  };

  const startWeightVerification = () => {
    setWeightStatus("checking");

    setTimeout(() => {
      setWeightStatus("matched");
    }, 1500);
  };

  const addToCart = () => {
    if (!product) return;

    const existingCart = JSON.parse(
      sessionStorage.getItem("smartCartCart") || "[]"
    );

    const existingIndex = existingCart.findIndex(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingIndex !== -1) {
      updatedCart = [...existingCart];

      updatedCart[existingIndex] = {
        ...updatedCart[existingIndex],
        quantity:
          (updatedCart[existingIndex].quantity || 1) + 1,
      };
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...product,
          quantity: 1,
          verified: true,
          identityVerified: true,
          weightVerified: true,
          measuredWeight: product.expectedWeight,
        },
      ];
    }

    sessionStorage.setItem(
      "smartCartCart",
      JSON.stringify(updatedCart)
    );

    sessionStorage.removeItem("smartCartPendingProduct");

    navigate("/cart");
  };

  if (!product) {
    return (
      <div className="verify-page">
        <div className="verify-card">
          <h1>Loading verification...</h1>
        </div>
      </div>
    );
  }

  const identityVerified =
    verificationStatus === "matched";

  const identityMismatch =
    verificationStatus === "mismatch";

  const weightVerified =
    weightStatus === "matched";

  const fullyVerified =
    identityVerified && weightVerified;

  return (
    <div className="verify-page">
      <div className="verify-card">

        <button
          className="back-button"
          onClick={() => {
            stopCamera();
            navigate("/scanner");
          }}
        >
          ← Back to Scanner
        </button>

        <div className="verify-header">
          <span className="verify-icon">🛡️</span>

          <div>
            <h1>Product Verification</h1>

            <p>
              Verify that the product placed in the trolley
              matches the scanned product.
            </p>
          </div>
        </div>

        <div className="product-summary">
          <div>
            <span className="summary-label">
              Scanned Product
            </span>

            <strong>{product.name}</strong>
          </div>

          <div>
            <span className="summary-label">
              Barcode
            </span>

            <strong>{product.barcode}</strong>
          </div>

          <div>
            <span className="summary-label">
              Expected Weight
            </span>

            <strong>
              {product.expectedWeight} g
            </strong>
          </div>

          <div>
            <span className="summary-label">
              Price
            </span>

            <strong>₹{product.price}</strong>
          </div>
        </div>

        {/* CAMERA SECTION */}

        <div className="camera-section">

          <div className="section-heading">
            <div>
              <h2>Step 1 — Check Product Identity</h2>

              <p>
                Place the product near the camera so its
                barcode can be detected.
              </p>
            </div>

            <span
              className={`camera-status ${cameraStatus}`}
            >
              {cameraStatus === "active" &&
                "● Camera On"}

              {cameraStatus === "starting" &&
                "Starting..."}

              {cameraStatus === "off" &&
                "Camera Off"}

              {cameraStatus === "error" &&
                "Camera Error"}
            </span>
          </div>

          <div className="camera-container">

            {cameraStatus !== "active" && (
              <div className="camera-placeholder">
                <div className="camera-placeholder-icon">
                  📷
                </div>

                <h3>Camera is Off</h3>

                <p>
                  Start the camera only when you are
                  ready to verify the product.
                </p>
              </div>
            )}

            <video
              ref={videoRef}
              className={`camera-video ${
                cameraStatus === "active"
                  ? "camera-visible"
                  : ""
              }`}
              autoPlay
              muted
              playsInline
            />
          </div>

          {cameraError && (
            <div className="camera-error">
              ⚠️ {cameraError}
            </div>
          )}

          <div className="camera-actions">

            {cameraStatus !== "active" && (
              <button
                className="primary-button"
                onClick={startCamera}
                disabled={cameraStatus === "starting"}
              >
                📷{" "}
                {cameraStatus === "starting"
                  ? "Starting Camera..."
                  : "Start Camera"}
              </button>
            )}

            {cameraStatus === "active" && (
              <button
                className="danger-button"
                onClick={stopCamera}
              >
                🛑 Turn Camera Off
              </button>
            )}

            {!identityVerified &&
              !identityMismatch && (
                <button
                  className="demo-button"
                  onClick={verifyWithDemo}
                >
                  ✓ Verify Product (Prototype)
                </button>
              )}
          </div>
        </div>

        {/* IDENTITY RESULT */}

        {identityVerified && (
          <div className="result-box success-box">
            <div className="result-icon">✅</div>

            <div>
              <h3>Product Identity Matched</h3>

              <p>
                The detected barcode matches the scanned
                product: <strong>{product.name}</strong>.
              </p>

              {detectedBarcode && (
                <p>
                  Detected Barcode:{" "}
                  <strong>{detectedBarcode}</strong>
                </p>
              )}

              {demoMode && (
                <small>
                  Prototype verification mode used.
                </small>
              )}
            </div>
          </div>
        )}

        {identityMismatch && (
          <div className="result-box danger-box">
            <div className="result-icon">❌</div>

            <div>
              <h3>Product Mismatch Detected</h3>

              <p>
                The barcode detected by the camera does
                not match the scanned product.
              </p>

              <p>
                Scanned:{" "}
                <strong>{product.barcode}</strong>
              </p>

              <p>
                Detected:{" "}
                <strong>{detectedBarcode}</strong>
              </p>

              <button
                className="secondary-button"
                onClick={() => {
                  setVerificationStatus("waiting");
                  setDetectedBarcode("");
                  setDemoMode(false);
                }}
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* WEIGHT SECTION */}

        {identityVerified && (
          <div className="weight-section">

            <div className="section-heading">
              <div>
                <h2>Step 2 — Check Weight</h2>

                <p>
                  The load-cell system will verify the
                  physical weight of the product.
                </p>
              </div>

              <span className="hardware-badge">
                ⚖️ Load Cell
              </span>
            </div>

            <div className="weight-card">

              <div className="weight-value">
                {weightStatus === "matched"
                  ? `${product.expectedWeight} g`
                  : "--"}
              </div>

              <p>
                Expected:{" "}
                <strong>
                  {product.expectedWeight} g
                </strong>
              </p>

              {weightStatus === "waiting" && (
                <button
                  className="primary-button"
                  onClick={startWeightVerification}
                >
                  ⚖️ Verify Weight (Prototype)
                </button>
              )}

              {weightStatus === "checking" && (
                <div className="checking-message">
                  ⏳ Checking weight...
                </div>
              )}

              {weightVerified && (
                <div className="weight-success">
                  ✅ Weight Matched
                </div>
              )}
            </div>
          </div>
        )}

        {/* FINAL RESULT */}

        {fullyVerified && (
          <div className="final-verification">

            <div className="final-icon">
              🎉
            </div>

            <h2>Product Fully Verified</h2>

            <p>
              Identity and weight verification both
              passed successfully.
            </p>

            <button
              className="cart-button"
              onClick={addToCart}
            >
              Add Verified Product to Cart →
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default VerifyWeight;