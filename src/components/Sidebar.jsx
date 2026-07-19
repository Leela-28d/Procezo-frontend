import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BusinessIcon from "@mui/icons-material/Business";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import InventoryIcon from "@mui/icons-material/Inventory";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = () => {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");
    console.log(role);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
    };

    return (
        <div className="sidebar">

            <div className="logo">
                ProcureFlow
            </div>

            <nav>

                {/* Dashboard - Everyone */}
                <NavLink to="/dashboard">
                    <DashboardIcon />
                    Dashboard
                </NavLink>

                {/* Employee */}
                {role === "EMPLOYEE" && (
                    <NavLink to="/purchase-requests">
                        <ShoppingCartIcon />
                        Purchase Requests
                    </NavLink>
                )}

                {/* Admin */}
                {role === "ADMIN" && (
                    <NavLink to="/workflows">
                        <AccountTreeIcon />
                        Workflow
                    </NavLink>
                )}

                {/* Manager / Finance / Procurement / Admin */}
                {(role === "MANAGER" ||
                  role === "FINANCE" ||
                  role === "PROCUREMENT" ||
                  role === "ADMIN") && (
                    <NavLink to="/approvals">
                        <CheckCircleIcon />
                        Approvals
                    </NavLink>
                )}

                {/* Procurement & Admin */}
                {(role === "PROCUREMENT" ||
                  role === "ADMIN") && (
                    <NavLink to="/vendors">
                        <BusinessIcon />
                        Vendors
                    </NavLink>
                )}

                {/* Procurement & Admin */}
                {(role === "PROCUREMENT" ||
                  role === "ADMIN") && (
                    <NavLink to="/purchase-orders">
                        <ReceiptLongIcon />
                        Purchase Orders
                    </NavLink>
                )}

                {/* Finance & Admin */}
                {/* {(role === "FINANCE" ||
                  role === "ADMIN") && (
                    <NavLink to="/invoices">
                        <InventoryIcon />
                        Invoices
                    </NavLink>
                )} */}


               {(role === "PROCUREMENT" ||
                role === "FINANCE" ||
                role === "ADMIN") && (

                    <NavLink to="/invoices">
                        <InventoryIcon />
                        Invoices
                    </NavLink>

                )}

            </nav>

            <button className="logout-btn" onClick={logout}>
                <LogoutIcon />
                Logout
            </button>

        </div>
    );
};

export default Sidebar;