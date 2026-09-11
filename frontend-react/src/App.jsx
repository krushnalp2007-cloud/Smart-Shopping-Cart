import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

function CustomerHome() {
    return (
        <div style={{ padding: "40px", fontFamily: "Arial" }}>
            <h1>SmartCart Customer Home</h1>
            <p>Customer page will be built next.</p>
        </div>
    );
}

function RetailerHome() {
    return (
        <div style={{ padding: "40px", fontFamily: "Arial" }}>
            <h1>SmartCart Retailer Dashboard</h1>
            <p>Retailer page will be built later.</p>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Login />} />

                <Route
                    path="/customer"
                    element={<CustomerHome />}
                />

                <Route
                    path="/retailer"
                    element={<RetailerHome />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;