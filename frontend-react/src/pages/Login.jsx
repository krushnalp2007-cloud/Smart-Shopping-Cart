import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const navigate = useNavigate();

    const [role, setRole] = useState("customer");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = (event) => {
        event.preventDefault();
        setError("");

        // Temporary frontend validation.
        // Real authentication will be connected later.
        if (!email.trim() || !password.trim()) {
            setError("Please enter your email and password.");
            return;
        }

        if (!email.includes("@")) {
            setError("Please enter a valid email address.");
            return;
        }

        if (password.length < 4) {
            setError("Password must contain at least 4 characters.");
            return;
        }

        localStorage.setItem("smartCartRole", role);
        localStorage.setItem("smartCartUser", email);

        if (role === "customer") {
            navigate("/customer");
        } else {
            navigate("/retailer");
        }
    };

    return (
        <main className="login-page">

            {/* ================= LEFT SIDE ================= */}

            <section className="login-brand-panel">

                <div className="brand">

                    <div className="brand-icon">
                        🛒
                    </div>

                    <div>
                        <h2>
                            Smart<span>Cart</span>
                        </h2>

                        <p>
                            Smart Shopping System
                        </p>
                    </div>

                </div>


                <div className="brand-message">

                    <p className="brand-label">
                        SMART SHOPPING, SIMPLIFIED
                    </p>

                    <h1>
                        Shop smarter.
                        <br />
                        Pay faster.
                    </h1>

                    <p className="brand-description">
                        Scan products, verify every item,
                        track your spending and complete
                        checkout directly from your smart cart.
                    </p>

                </div>


                <div className="feature-list">

                    <div className="feature-item">
                        <span>✓</span>
                        Smart barcode scanning
                    </div>

                    <div className="feature-item">
                        <span>✓</span>
                        Automatic weight verification
                    </div>

                    <div className="feature-item">
                        <span>✓</span>
                        Fast digital checkout
                    </div>

                </div>

            </section>


            {/* ================= RIGHT SIDE ================= */}

            <section className="login-form-panel">

                <div className="login-card">

                    <div className="mobile-brand">

                        <div className="brand-icon">
                            🛒
                        </div>

                        <div>
                            <h2>
                                Smart<span>Cart</span>
                            </h2>

                            <p>
                                Smart Shopping System
                            </p>
                        </div>

                    </div>


                    <div className="login-heading">

                        <p className="heading-label">
                            WELCOME
                        </p>

                        <h1>
                            Sign in to SmartCart
                        </h1>

                        <p>
                            Enter your details to continue.
                        </p>

                    </div>


                    <form onSubmit={handleLogin}>

                        {/* EMAIL */}

                        <div className="field">

                            <label htmlFor="email">
                                Email address
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                placeholder="you@example.com"
                                autoComplete="email"
                            />

                        </div>


                        {/* PASSWORD */}

                        <div className="field">

                            <label htmlFor="password">
                                Password
                            </label>

                            <div className="password-wrapper">

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                />

                                <button
                                    type="button"
                                    className="show-password"
                                    onClick={() =>
                                        setShowPassword(
                                            (current) => !current
                                        )
                                    }
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>

                            </div>

                        </div>


                        {/* ROLE */}

                        <div className="field">

                            <label>
                                Continue as
                            </label>

                            <div className="role-grid">

                                <button
                                    type="button"
                                    className={`role-card ${
                                        role === "customer"
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setRole("customer")
                                    }
                                >

                                    <span className="role-icon">
                                        👤
                                    </span>

                                    <span>
                                        <strong>
                                            Customer
                                        </strong>

                                        <small>
                                            Shop & pay
                                        </small>
                                    </span>

                                </button>


                                <button
                                    type="button"
                                    className={`role-card ${
                                        role === "retailer"
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setRole("retailer")
                                    }
                                >

                                    <span className="role-icon">
                                        🏪
                                    </span>

                                    <span>
                                        <strong>
                                            Retailer
                                        </strong>

                                        <small>
                                            Manage store
                                        </small>
                                    </span>

                                </button>

                            </div>

                        </div>


                        {/* REMEMBER + FORGOT */}

                        <div className="form-options">

                            <label className="remember-option">

                                <input type="checkbox" />

                                <span>
                                    Remember me
                                </span>

                            </label>

                            <button
                                type="button"
                                className="forgot-button"
                            >
                                Forgot password?
                            </button>

                        </div>


                        {/* ERROR */}

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}


                        {/* LOGIN BUTTON */}

                        <button
                            type="submit"
                            className="login-button"
                        >

                            <span>
                                Sign In
                            </span>

                            <span className="login-arrow">
                                →
                            </span>

                        </button>

                    </form>


                    <div className="divider">

                        <span></span>

                        <p>
                            New to SmartCart?
                        </p>

                        <span></span>

                    </div>


                    <button
                        type="button"
                        className="create-account-button"
                    >
                        Create an account
                    </button>


                    <p className="security-text">
                        🔒 Your information is securely protected.
                    </p>

                </div>

            </section>

        </main>
    );
}

export default Login;