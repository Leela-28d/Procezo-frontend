import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PurchaseRequest from "./pages/PurchaseRequest";
import Vendors from "./pages/Vendors";
import Workflow from "./pages/Workflow";
import Approvals from "./pages/Approvals";
import VendorComparison from "./pages/VendorComparison";
import PurchaseOrders from "./pages/PurchaseOrders";
// import VendorComparison from "./pages/VendorComparison";
import Invoices from "./pages/Invoices";


function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        <Route
          path="/purchase-requests"
          element={<PurchaseRequest />}
        />

        <Route path="/vendors" element={<Vendors />} />

        <Route path="/workflows" element={<Workflow />} />

        <Route
            path="/approvals"
            element={<Approvals />}
        />

        <Route
            path="/vendors/compare/:requestId"
            element={<VendorComparison />}
        />

        <Route
            path="/purchase-orders"
            element={<PurchaseOrders />}
        />

        <Route path="/invoices" element={<Invoices />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;