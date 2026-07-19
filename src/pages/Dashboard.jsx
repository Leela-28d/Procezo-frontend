// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./Dashboard.css";
// import Sidebar from "../components/Sidebar";

// function Dashboard() {

//     const [summary, setSummary] = useState({
//         purchaseRequests: 0,
//         vendors: 0,
//         purchaseOrders: 0,
//         invoices: 0
//     });

//     useEffect(() => {

//         const token = localStorage.getItem("token");

//         axios.get("http://localhost:7777/api/dashboard/summary", {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         })
//         .then(res => {
//             setSummary(res.data);
//         })
//         .catch(err => {
//             console.log(err);
//         });

//     }, []);

//     return (

//         <div className="dashboard">

//             <h1>Dashboard</h1>

//             <div className="cards">

//                 <div className="card">
//                     <h2>{summary.purchaseRequests}</h2>
//                     <p>Purchase Requests</p>
//                 </div>

//                 <div className="card">
//                     <h2>{summary.vendors}</h2>
//                     <p>Vendors</p>
//                 </div>

//                 <div className="card">
//                     <h2>{summary.purchaseOrders}</h2>
//                     <p>Purchase Orders</p>
//                 </div>

//                 <div className="card">
//                     <h2>{summary.invoices}</h2>
//                     <p>Invoices</p>
//                 </div>

//             </div>

//         </div>

//     );

// }

// export default Dashboard;





















import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Dashboard() {

    const [summary, setSummary] = useState({
        purchaseRequests: 0,
        vendors: 0,
        purchaseOrders: 0,
        invoices: 0
    });

    useEffect(() => {

        const token = localStorage.getItem("token");

        axios.get("http://localhost:7777/api/dashboard/summary", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            setSummary(res.data);
        })
        .catch(err => {
            console.log(err);
        });

    }, []);

    return (
        <>
            <Sidebar />

            <div
                className="dashboard"
                style={{
                    marginLeft: "270px",
                    padding: "40px"
                }}
            >
                <Navbar />

                <h1>Dashboard</h1>

                <div className="cards">

                    <div className="card">
                        <h2>{summary.purchaseRequests}</h2>
                        <p>Purchase Requests</p>
                    </div>

                    <div className="card">
                        <h2>{summary.vendors}</h2>
                        <p>Vendors</p>
                    </div>

                    <div className="card">
                        <h2>{summary.purchaseOrders}</h2>
                        <p>Purchase Orders</p>
                    </div>

                    <div className="card">
                        <h2>{summary.invoices}</h2>
                        <p>Invoices</p>
                    </div>

                </div>

            </div>
        </>
    );
}

export default Dashboard;